const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const NotificationTemplate = require('../models/notificationTemplate');

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Create a notification template
 *     tags: [Templates]
 *     description: Create a reusable template for notifications with variable substitution
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - channel
 *               - body
 *             properties:
 *               name:
 *                 type: string
 *                 pattern: '^[a-zA-Z0-9_-]+$'
 *                 example: welcome_email
 *               description:
 *                 type: string
 *                 example: Welcome email template
 *               channel:
 *                 type: string
 *                 enum: [email, sms, push, whatsapp]
 *                 example: email
 *               subject:
 *                 type: string
 *                 maxLength: 200
 *                 example: Welcome {{name}}!
 *               body:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 10000
 *                 example: Hello {{name}}, welcome to Blackie Networks!
 *               variables:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Template variables (auto-extracted from body if not provided)
 *                 example: [name, code]
 *     responses:
 *       201:
 *         description: Template created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Template with this name already exists
 */
router.post('/',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Name can only contain letters, numbers, underscores, and hyphens'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    body('channel')
      .isIn(['email', 'sms', 'push', 'whatsapp'])
      .withMessage('Channel must be one of: email, sms, push, whatsapp'),
    body('subject')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Subject must not exceed 200 characters'),
    body('body')
      .notEmpty()
      .withMessage('Body is required')
      .isLength({ min: 1, max: 10000 })
      .withMessage('Body must be between 1 and 10000 characters'),
    body('variables')
      .optional()
      .isArray()
      .withMessage('Variables must be an array')
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

      const { name, description, channel, subject, body, variables = [], category, metadata = {} } = req.body;

      // Extract variables from body if not provided
      const extractedVariables = variables.length > 0 
        ? variables 
        : (body.match(/\{\{(\w+)\}\}/g) || []).map(v => v.replace(/[{}]/g, ''));

      const template = new NotificationTemplate({
        name,
        description,
        channel,
        subject,
        body,
        variables: [...new Set(extractedVariables)], // Remove duplicates
        category: category || 'general',
        metadata
      });

      const savedTemplate = await template.save();

      return res.status(201).json({
        success: true,
        message: 'Template created successfully',
        data: { template: savedTemplate }
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          error: 'DUPLICATE_TEMPLATE',
          message: 'Template with this name already exists'
        });
      }
      console.error('Error creating template:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while creating template'
      });
    }
  }
);

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: List all templates
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: channel
 *         schema:
 *           type: string
 *           enum: [email, sms, push, whatsapp]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Templates retrieved successfully
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
 *                         templates:
 *                           type: array
 *                         total:
 *                           type: number
 */
router.get('/',
  async (req, res) => {
    try {
      const { channel, category, isActive } = req.query;
      const query = {};

      if (channel) query.channel = channel;
      if (category) query.category = category;
      if (isActive !== undefined) query.isActive = isActive === 'true';

      const templates = await NotificationTemplate.find(query)
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        message: 'Templates retrieved successfully',
        data: {
          templates,
          total: templates.length
        }
      });
    } catch (error) {
      console.error('Error fetching templates:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching templates'
      });
    }
  }
);

/**
 * Get single template
 * GET /api/templates/:id
 */
router.get('/:id',
  async (req, res) => {
    try {
      const template = await NotificationTemplate.findById(req.params.id);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Template not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Template retrieved successfully',
        data: { template }
      });
    } catch (error) {
      console.error('Error fetching template:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching template'
      });
    }
  }
);

/**
 * Preview template with sample data
 * GET /api/templates/:id/preview
 */
router.get('/:id/preview',
  async (req, res) => {
    try {
      const template = await NotificationTemplate.findById(req.params.id);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Template not found'
        });
      }

      // Generate sample data for preview
      const sampleData = {};
      template.variables.forEach(variable => {
        sampleData[variable] = `[Sample ${variable}]`;
      });

      const rendered = template.render(sampleData);

      return res.status(200).json({
        success: true,
        message: 'Template preview generated',
        data: {
          template: {
            name: template.name,
            channel: template.channel,
            subject: rendered.subject,
            body: rendered.body,
            variables: template.variables,
            sampleData
          }
        }
      });
    } catch (error) {
      console.error('Error previewing template:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while previewing template'
      });
    }
  }
);

/**
 * Update template
 * PUT /api/templates/:id
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
    body('body')
      .optional()
      .isLength({ min: 1, max: 10000 })
      .withMessage('Body must be between 1 and 10000 characters')
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

      const template = await NotificationTemplate.findById(req.params.id);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Template not found'
        });
      }

      const { name, description, subject, body, variables, isActive, category, metadata } = req.body;

      if (name) template.name = name;
      if (description !== undefined) template.description = description;
      if (subject !== undefined) template.subject = subject;
      if (body) {
        template.body = body;
        // Re-extract variables if body changed
        if (!variables) {
          template.variables = [...new Set((body.match(/\{\{(\w+)\}\}/g) || []).map(v => v.replace(/[{}]/g, '')))];
        }
      }
      if (variables) template.variables = [...new Set(variables)];
      if (isActive !== undefined) template.isActive = isActive;
      if (category) template.category = category;
      if (metadata) template.metadata = metadata;

      await template.save();

      return res.status(200).json({
        success: true,
        message: 'Template updated successfully',
        data: { template }
      });
    } catch (error) {
      console.error('Error updating template:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while updating template'
      });
    }
  }
);

/**
 * Delete template
 * DELETE /api/templates/:id
 */
router.delete('/:id',
  async (req, res) => {
    try {
      const template = await NotificationTemplate.findById(req.params.id);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Template not found'
        });
      }

      await template.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Template deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while deleting template'
      });
    }
  }
);

module.exports = router;

