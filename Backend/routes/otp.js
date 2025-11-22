const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../utils/tokenAuth');
const {
  sendOTPViaEmail,
  sendOTPViaSMS,
  sendOTPViaBoth,
  verifyOTP
} = require('../utils/otpService');

/**
 * @swagger
 * /api/otp/send/email:
 *   post:
 *     summary: Send OTP via email
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     description: Generate and send a one-time password (OTP) to the specified email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               recipientName:
 *                 type: string
 *                 example: John Doe
 *               otpLength:
 *                 type: number
 *                 minimum: 4
 *                 maximum: 8
 *                 default: 6
 *                 example: 6
 *               expiresInMinutes:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 60
 *                 default: 10
 *                 example: 10
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OTP'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Token doesn't have email channel permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/send/email',
  authenticateToken,
  [
    body('email')
      .isEmail()
      .withMessage('Valid email address is required'),
    body('recipientName')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Recipient name must not exceed 100 characters'),
    body('otpLength')
      .optional()
      .isInt({ min: 4, max: 8 })
      .withMessage('OTP length must be between 4 and 8'),
    body('expiresInMinutes')
      .optional()
      .isInt({ min: 1, max: 60 })
      .withMessage('Expiration time must be between 1 and 60 minutes')
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

      // Check channel permission
      if (!req.accessToken.allowedChannels.includes('email')) {
        return res.status(403).json({
          success: false,
          error: 'CHANNEL_NOT_ALLOWED',
          message: 'Your access token does not have permission to send email notifications.'
        });
      }

      const { email, recipientName, otpLength, expiresInMinutes } = req.body;

      const result = await sendOTPViaEmail(
        req.tokenId,
        email,
        recipientName,
        { otpLength, expiresInMinutes }
      );

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully via email',
        data: {
          email,
          expiresInMinutes: result.expiresInMinutes,
          notificationId: result.notificationId,
          messageId: result.messageId,
          // Only include OTP in development/testing
          ...(process.env.NODE_ENV !== 'production' && { otp: result.otp })
        }
      });
    } catch (error) {
      console.error('Error sending OTP via email:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while sending OTP',
        details: {
          hint: error.message
        }
      });
    }
  }
);

/**
 * @swagger
 * /api/otp/send/sms:
 *   post:
 *     summary: Send OTP via SMS
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     description: Generate and send a one-time password (OTP) to the specified phone number. Uses test number +254796869402 for testing.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 pattern: '^\+?[1-9]\d{1,14}$'
 *                 description: Phone number in E.164 format (e.g., +254796869402)
 *                 example: +254796869402
 *               otpLength:
 *                 type: number
 *                 minimum: 4
 *                 maximum: 8
 *                 default: 6
 *                 example: 6
 *               expiresInMinutes:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 60
 *                 default: 10
 *                 example: 10
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OTP'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Token doesn't have SMS channel permission
 */
router.post('/send/sms',
  authenticateToken,
  [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Phone number must be in E.164 format (e.g., +1234567890)'),
    body('otpLength')
      .optional()
      .isInt({ min: 4, max: 8 })
      .withMessage('OTP length must be between 4 and 8'),
    body('expiresInMinutes')
      .optional()
      .isInt({ min: 1, max: 60 })
      .withMessage('Expiration time must be between 1 and 60 minutes')
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

      // Check channel permission
      if (!req.accessToken.allowedChannels.includes('sms')) {
        return res.status(403).json({
          success: false,
          error: 'CHANNEL_NOT_ALLOWED',
          message: 'Your access token does not have permission to send SMS notifications.'
        });
      }

      const { phoneNumber, otpLength, expiresInMinutes } = req.body;

      const result = await sendOTPViaSMS(
        req.tokenId,
        phoneNumber,
        { otpLength, expiresInMinutes }
      );

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully via SMS',
        data: {
          phoneNumber,
          expiresInMinutes: result.expiresInMinutes,
          notificationId: result.notificationId,
          messageId: result.messageId,
          // Only include OTP in development/testing
          ...(process.env.NODE_ENV !== 'production' && { otp: result.otp })
        }
      });
    } catch (error) {
      console.error('Error sending OTP via SMS:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while sending OTP',
        details: {
          hint: error.message
        }
      });
    }
  }
);

/**
 * @swagger
 * /api/otp/send/both:
 *   post:
 *     summary: Send OTP via both email and SMS
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     description: Generate and send the same OTP code to both email and SMS. The same OTP can be verified using either identifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phoneNumber
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               phoneNumber:
 *                 type: string
 *                 pattern: '^\+?[1-9]\d{1,14}$'
 *                 example: +254796869402
 *               recipientName:
 *                 type: string
 *                 example: John Doe
 *               otpLength:
 *                 type: number
 *                 minimum: 4
 *                 maximum: 8
 *                 default: 6
 *               expiresInMinutes:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 60
 *                 default: 10
 *     responses:
 *       200:
 *         description: OTP sent successfully via both channels
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/OTP'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         emailNotification:
 *                           type: object
 *                         smsNotification:
 *                           type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Token doesn't have permission for both email and SMS channels
 */
router.post('/send/both',
  authenticateToken,
  [
    body('email')
      .isEmail()
      .withMessage('Valid email address is required'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Phone number must be in E.164 format (e.g., +1234567890)'),
    body('recipientName')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Recipient name must not exceed 100 characters'),
    body('otpLength')
      .optional()
      .isInt({ min: 4, max: 8 })
      .withMessage('OTP length must be between 4 and 8'),
    body('expiresInMinutes')
      .optional()
      .isInt({ min: 1, max: 60 })
      .withMessage('Expiration time must be between 1 and 60 minutes')
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

      // Check channel permissions
      if (!req.accessToken.allowedChannels.includes('email') || 
          !req.accessToken.allowedChannels.includes('sms')) {
        return res.status(403).json({
          success: false,
          error: 'CHANNEL_NOT_ALLOWED',
          message: 'Your access token must have permission for both email and SMS channels.'
        });
      }

      const { email, phoneNumber, recipientName, otpLength, expiresInMinutes } = req.body;

      const result = await sendOTPViaBoth(
        req.tokenId,
        email,
        phoneNumber,
        recipientName,
        { otpLength, expiresInMinutes }
      );

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully via both email and SMS',
        data: {
          email,
          phoneNumber,
          expiresInMinutes: result.expiresInMinutes,
          emailNotification: result.email,
          smsNotification: result.sms,
          // Only include OTP in development/testing
          ...(process.env.NODE_ENV !== 'production' && { otp: result.otp })
        }
      });
    } catch (error) {
      console.error('Error sending OTP via both channels:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while sending OTP',
        details: {
          hint: error.message
        }
      });
    }
  }
);

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify OTP code
 *     tags: [OTP]
 *     description: Verify an OTP code using the email or phone number it was sent to. No authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - otp
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email address or phone number used when sending OTP
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 pattern: '^\d{4,8}$'
 *                 description: The OTP code to verify (4-8 digits)
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     verified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   enum: [INVALID_OTP, OTP_EXPIRED, OTP_NOT_FOUND, MAX_ATTEMPTS_EXCEEDED]
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     verified:
 *                       type: boolean
 *                       example: false
 *                     attemptsRemaining:
 *                       type: number
 */
router.post('/verify',
  [
    body('identifier')
      .notEmpty()
      .withMessage('Identifier (email or phone number) is required'),
    body('otp')
      .notEmpty()
      .withMessage('OTP code is required')
      .matches(/^\d{4,8}$/)
      .withMessage('OTP must be 4-8 digits')
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

      const { identifier, otp } = req.body;

      const result = verifyOTP(identifier, otp);

      if (result.valid) {
        return res.status(200).json({
          success: true,
          message: 'OTP verified successfully',
          data: {
            verified: true
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
          message: result.message,
          data: {
            verified: false,
            ...(result.attemptsRemaining !== undefined && {
              attemptsRemaining: result.attemptsRemaining
            })
          }
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while verifying OTP',
        details: {
          hint: error.message
        }
      });
    }
  }
);

module.exports = router;

