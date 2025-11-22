const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const AccessToken = require('../models/accessToken');

/**
 * @swagger
 * /api/tokens:
 *   post:
 *     summary: Create a new access token
 *     tags: [Tokens]
 *     description: Creates a new API access token. **Save the token immediately - you won't see it again!**
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: My Service Token
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Token for my service integration
 *               allowedChannels:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [email, sms, push, whatsapp]
 *                 example: [email, sms]
 *               rateLimit:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10000
 *                 default: 1000
 *                 example: 1000
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: Optional expiration date (null means never expires)
 *     responses:
 *       201:
 *         description: Token created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         token:
 *                           type: string
 *                           description: The access token (save this immediately!)
 *                         id:
 *                           type: string
 *                         warning:
 *                           type: string
 *                           example: "⚠️ Save this token now. You will not be able to see it again!"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    body('allowedChannels')
      .optional()
      .isArray()
      .withMessage('allowedChannels must be an array'),
    body('allowedChannels.*')
      .isIn(['email', 'sms', 'push', 'whatsapp'])
      .withMessage('Each channel must be one of: email, sms, push, whatsapp'),
    body('rateLimit')
      .optional()
      .isInt({ min: 1, max: 10000 })
      .withMessage('rateLimit must be between 1 and 10000'),
    body('expiresAt')
      .optional()
      .isISO8601()
      .withMessage('expiresAt must be a valid ISO 8601 date')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        });
      }

      const {
        name,
        description,
        allowedChannels = ['email', 'sms'],
        rateLimit = 1000,
        expiresAt,
        metadata = {}
      } = req.body;

      const accessToken = new AccessToken({
        name,
        description,
        allowedChannels,
        rateLimit,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        metadata,
        createdBy: req.headers['x-created-by'] || 'api'
      });

      const savedToken = await accessToken.save();

      // Return full token only on creation
      return res.status(201).json({
        success: true,
        message: 'Access token created successfully',
        data: {
          token: savedToken.token, // Full token only shown once
          id: savedToken._id.toString(),
          name: savedToken.name,
          description: savedToken.description,
          allowedChannels: savedToken.allowedChannels,
          rateLimit: savedToken.rateLimit,
          expiresAt: savedToken.expiresAt,
          createdAt: savedToken.createdAt,
          warning: '⚠️ Save this token now. You will not be able to see it again!'
        }
      });
    } catch (error) {
      console.error('Error creating access token:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while creating access token'
      });
    }
  }
);

/**
 * @swagger
 * /api/tokens:
 *   get:
 *     summary: List all access tokens
 *     tags: [Tokens]
 *     description: Retrieve a list of all access tokens (tokens are masked for security)
 *     responses:
 *       200:
 *         description: List of tokens retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         tokens:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/AccessToken'
 *                         total:
 *                           type: number
 */
router.get('/',
  async (req, res) => {
    try {
      const tokens = await AccessToken.find({})
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        message: 'Access tokens retrieved successfully',
        data: {
          tokens: tokens.map(token => ({
            id: token._id.toString(),
            name: token.name,
            description: token.description,
            isActive: token.isActive,
            allowedChannels: token.allowedChannels,
            rateLimit: token.rateLimit,
            usageCount: token.usageCount,
            lastUsed: token.lastUsed,
            expiresAt: token.expiresAt,
            createdAt: token.createdAt
          })),
          total: tokens.length
        }
      });
    } catch (error) {
      console.error('Error fetching access tokens:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching access tokens'
      });
    }
  }
);

/**
 * @swagger
 * /api/tokens/{id}:
 *   get:
 *     summary: Get a specific access token
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Token ID
 *     responses:
 *       200:
 *         description: Token retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         token:
 *                           $ref: '#/components/schemas/AccessToken'
 *       404:
 *         description: Token not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id',
  async (req, res) => {
    try {
      const token = await AccessToken.findById(req.params.id).lean();

      if (!token) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Access token not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Access token retrieved successfully',
        data: {
          token: {
            id: token._id.toString(),
            name: token.name,
            description: token.description,
            isActive: token.isActive,
            allowedChannels: token.allowedChannels,
            rateLimit: token.rateLimit,
            usageCount: token.usageCount,
            lastUsed: token.lastUsed,
            expiresAt: token.expiresAt,
            createdAt: token.createdAt
          }
        }
      });
    } catch (error) {
      console.error('Error fetching access token:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching access token'
      });
    }
  }
);

/**
 * Update access token
 * PUT /api/tokens/:id
 */
router.put('/:id',
  [
    body('name')
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean'),
    body('allowedChannels')
      .optional()
      .isArray()
      .withMessage('allowedChannels must be an array')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        });
      }

      const token = await AccessToken.findById(req.params.id);

      if (!token) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Access token not found'
        });
      }

      const { name, description, isActive, allowedChannels, rateLimit, expiresAt } = req.body;

      if (name) token.name = name;
      if (description !== undefined) token.description = description;
      if (isActive !== undefined) token.isActive = isActive;
      if (allowedChannels) token.allowedChannels = allowedChannels;
      if (rateLimit) token.rateLimit = rateLimit;
      if (expiresAt !== undefined) token.expiresAt = expiresAt ? new Date(expiresAt) : null;

      await token.save();

      return res.status(200).json({
        success: true,
        message: 'Access token updated successfully',
        data: {
          token: {
            id: token._id.toString(),
            name: token.name,
            description: token.description,
            isActive: token.isActive,
            allowedChannels: token.allowedChannels,
            rateLimit: token.rateLimit,
            expiresAt: token.expiresAt
          }
        }
      });
    } catch (error) {
      console.error('Error updating access token:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while updating access token'
      });
    }
  }
);

/**
 * Delete access token
 * DELETE /api/tokens/:id
 */
router.delete('/:id',
  async (req, res) => {
    try {
      const token = await AccessToken.findById(req.params.id);

      if (!token) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Access token not found'
        });
      }

      await token.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Access token deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting access token:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while deleting access token'
      });
    }
  }
);

module.exports = router;

