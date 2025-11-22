const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken, checkChannelPermission } = require('../utils/tokenAuth');
const { sendNotification, sendBulkNotifications } = require('../utils/notificationService');
const Notification = require('../models/notification');
const NotificationTemplate = require('../models/notificationTemplate');

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Send a single notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     description: Send a notification via email, SMS, push, or WhatsApp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - channel
 *               - recipient
 *               - message
 *             properties:
 *               channel:
 *                 type: string
 *                 enum: [email, sms, push, whatsapp]
 *                 example: email
 *               recipient:
 *                 type: string
 *                 description: Email address or phone number (E.164 format for SMS)
 *                 example: user@example.com
 *               recipientName:
 *                 type: string
 *                 example: John Doe
 *               subject:
 *                 type: string
 *                 maxLength: 200
 *                 description: Required for email channel
 *                 example: Welcome to Blackie Networks!
 *               message:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 5000
 *                 description: HTML content for email, plain text for SMS
 *                 example: <h1>Welcome!</h1><p>Thank you for joining us.</p>
 *               templateId:
 *                 type: string
 *                 description: Optional template ID to use
 *               templateData:
 *                 type: object
 *                 description: Data to populate template variables
 *                 example: { name: "John", code: "123456" }
 *               scheduledFor:
 *                 type: string
 *                 format: date-time
 *                 description: Optional future date to schedule the notification
 *     responses:
 *       201:
 *         description: Notification sent successfully
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
 *                         notificationId:
 *                           type: string
 *                         messageId:
 *                           type: string
 *                         status:
 *                           type: string
 *                         channel:
 *                           type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Token doesn't have permission for this channel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/send', 
  authenticateToken,
  [
    body('channel')
      .isIn(['email', 'sms', 'push', 'whatsapp'])
      .withMessage('Channel must be one of: email, sms, push, whatsapp'),
    body('recipient')
      .notEmpty()
      .withMessage('Recipient is required')
      .custom((value, { req }) => {
        const channel = req.body.channel;
        if (channel === 'email' && !value.includes('@')) {
          throw new Error('Recipient must be a valid email address for email channel');
        }
        if (channel === 'sms' && !/^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ''))) {
          throw new Error('Recipient must be a valid phone number (E.164 format) for SMS channel');
        }
        return true;
      }),
    body('message')
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 1, max: 5000 })
      .withMessage('Message must be between 1 and 5000 characters'),
    body('subject')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Subject must not exceed 200 characters'),
    body('scheduledFor')
      .optional()
      .isISO8601()
      .withMessage('scheduledFor must be a valid ISO 8601 date')
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error('scheduledFor must be a future date');
        }
        return true;
      })
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().map(err => ({
            field: err.path || err.param,
            message: err.msg,
            value: err.value
          }))
        });
      }

      const { channel, recipient, message, subject, recipientName, templateId, templateData, metadata, scheduledFor } = req.body;

      // Check channel permission
      if (!req.accessToken.allowedChannels.includes(channel.toLowerCase())) {
        return res.status(403).json({
          success: false,
          error: 'CHANNEL_NOT_ALLOWED',
          message: `Your access token does not have permission to send ${channel} notifications.`,
          details: {
            allowedChannels: req.accessToken.allowedChannels,
            requestedChannel: channel
          }
        });
      }

      // Send notification
      const result = await sendNotification(
        req.tokenId,
        channel,
        recipient,
        {
          recipientName,
          subject,
          message,
          templateId,
          templateData: templateData || {},
          metadata: metadata || {},
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null
        }
      );

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: 'Notification sent successfully',
          data: {
            notificationId: result.notificationId,
            messageId: result.messageId,
            status: result.status,
            channel: result.channel,
            scheduledFor: result.scheduledFor || undefined
          }
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'NOTIFICATION_FAILED',
          message: 'Failed to send notification',
          details: {
            notificationId: result.notificationId,
            error: result.error
          }
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while sending notification',
        details: {
          hint: error.message
        }
      });
    }
  }
);

/**
 * @swagger
 * /api/notifications/bulk:
 *   post:
 *     summary: Send bulk notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     description: Send multiple notifications in a single request (max 100)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notifications
 *             properties:
 *               notifications:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 100
 *                 items:
 *                   type: object
 *                   required:
 *                     - channel
 *                     - recipient
 *                     - message
 *                   properties:
 *                     channel:
 *                       type: string
 *                       enum: [email, sms, push, whatsapp]
 *                     recipient:
 *                       type: string
 *                     subject:
 *                       type: string
 *                     message:
 *                       type: string
 *     responses:
 *       201:
 *         description: Bulk notifications processed
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
 *                         total:
 *                           type: number
 *                         successful:
 *                           type: number
 *                         failed:
 *                           type: number
 *                         results:
 *                           type: array
 */
router.post('/bulk',
  authenticateToken,
  [
    body('notifications')
      .isArray({ min: 1, max: 100 })
      .withMessage('notifications must be an array with 1-100 items'),
    body('notifications.*.channel')
      .isIn(['email', 'sms', 'push', 'whatsapp'])
      .withMessage('Each notification must have a valid channel'),
    body('notifications.*.recipient')
      .notEmpty()
      .withMessage('Each notification must have a recipient'),
    body('notifications.*.message')
      .notEmpty()
      .withMessage('Each notification must have a message')
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

      const { notifications } = req.body;

      // Check channel permissions for all notifications
      const uniqueChannels = [...new Set(notifications.map(n => n.channel.toLowerCase()))];
      for (const channel of uniqueChannels) {
        if (!req.accessToken.allowedChannels.includes(channel)) {
          return res.status(403).json({
            success: false,
            error: 'CHANNEL_NOT_ALLOWED',
            message: `Your access token does not have permission to send ${channel} notifications.`,
            details: {
              allowedChannels: req.accessToken.allowedChannels,
              requestedChannel: channel
            }
          });
        }
      }

      const result = await sendBulkNotifications(req.tokenId, notifications);

      return res.status(201).json({
        success: true,
        message: 'Bulk notifications processed',
        data: {
          total: result.total,
          successful: result.successful,
          failed: result.failed,
          results: result.results
        }
      });
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while sending bulk notifications',
        details: {
          hint: error.message
        }
      });
    }
  }
);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: List notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, sent, delivered, failed, bounced]
 *       - in: query
 *         name: channel
 *         schema:
 *           type: string
 *           enum: [email, sms, push, whatsapp]
 *       - in: query
 *         name: recipient
 *         schema:
 *           type: string
 *         description: Filter by recipient (partial match)
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
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
 *                         notifications:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Notification'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             page:
 *                               type: number
 *                             limit:
 *                               type: number
 *                             total:
 *                               type: number
 *                             pages:
 *                               type: number
 */
router.get('/',
  authenticateToken,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        channel,
        recipient,
        startDate,
        endDate
      } = req.query;

      const query = { accessTokenId: req.tokenId };

      if (status) query.status = status;
      if (channel) query.channel = channel;
      if (recipient) query.recipient = { $regex: recipient, $options: 'i' };
      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const notifications = await Notification.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip(skip)
        .lean();

      const total = await Notification.countDocuments(query);

      return res.status(200).json({
        success: true,
        message: 'Notifications retrieved successfully',
        data: {
          notifications,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        }
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching notifications'
      });
    }
  }
);

/**
 * Get single notification
 * GET /api/notifications/:id
 */
router.get('/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const notification = await Notification.findOne({
        _id: req.params.id,
        accessTokenId: req.tokenId
      });

      if (!notification) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Notification not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Notification retrieved successfully',
        data: { notification }
      });
    } catch (error) {
      console.error('Error fetching notification:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching notification'
      });
    }
  }
);

/**
 * Retry failed notification
 * POST /api/notifications/:id/retry
 */
router.post('/:id/retry',
  authenticateToken,
  async (req, res) => {
    try {
      const notification = await Notification.findOne({
        _id: req.params.id,
        accessTokenId: req.tokenId
      });

      if (!notification) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Notification not found'
        });
      }

      if (notification.status !== 'failed') {
        return res.status(400).json({
          success: false,
          error: 'INVALID_STATUS',
          message: 'Only failed notifications can be retried',
          details: {
            currentStatus: notification.status
          }
        });
      }

      if (notification.retryCount >= notification.maxRetries) {
        return res.status(400).json({
          success: false,
          error: 'MAX_RETRIES_EXCEEDED',
          message: 'Maximum retry attempts exceeded',
          details: {
            retryCount: notification.retryCount,
            maxRetries: notification.maxRetries
          }
        });
      }

      // Reset status and retry
      notification.status = 'pending';
      notification.errorMessage = null;
      await notification.save();

      const result = await sendNotification(
        notification.accessTokenId,
        notification.channel,
        notification.recipient,
        {
          recipientName: notification.recipientName,
          subject: notification.subject,
          message: notification.message,
          templateId: notification.templateId,
          templateData: notification.templateData,
          metadata: notification.metadata
        }
      );

      return res.status(200).json({
        success: true,
        message: 'Notification retry initiated',
        data: {
          notificationId: result.notificationId,
          status: result.status
        }
      });
    } catch (error) {
      console.error('Error retrying notification:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while retrying notification'
      });
    }
  }
);

/**
 * @swagger
 * /api/notifications/stats/summary:
 *   get:
 *     summary: Get notification statistics
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for statistics
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for statistics
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
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
 *                         summary:
 *                           type: object
 *                           properties:
 *                             total:
 *                               type: number
 *                             sent:
 *                               type: number
 *                             delivered:
 *                               type: number
 *                             failed:
 *                               type: number
 *                             pending:
 *                               type: number
 *                             successRate:
 *                               type: string
 *                               example: "95.5%"
 *                         byChannel:
 *                           type: array
 *                           items:
 *                             type: object
 */
router.get('/stats/summary',
  authenticateToken,
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const query = { accessTokenId: req.tokenId };

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      const stats = await Notification.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
            delivered: { $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] } },
            failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
            pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
            byChannel: {
              $push: {
                channel: '$channel',
                status: '$status'
              }
            }
          }
        }
      ]);

      const channelStats = await Notification.aggregate([
        { $match: query },
        {
          $group: {
            _id: '$channel',
            count: { $sum: 1 },
            sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
            failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } }
          }
        }
      ]);

      const result = stats[0] || {
        total: 0,
        sent: 0,
        delivered: 0,
        failed: 0,
        pending: 0
      };

      return res.status(200).json({
        success: true,
        message: 'Statistics retrieved successfully',
        data: {
          summary: {
            total: result.total,
            sent: result.sent,
            delivered: result.delivered,
            failed: result.failed,
            pending: result.pending,
            successRate: result.total > 0 
              ? ((result.sent + result.delivered) / result.total * 100).toFixed(2) + '%'
              : '0%'
          },
          byChannel: channelStats.map(s => ({
            channel: s._id,
            total: s.count,
            sent: s.sent,
            failed: s.failed,
            successRate: s.count > 0 ? ((s.sent / s.count) * 100).toFixed(2) + '%' : '0%'
          }))
        }
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching statistics'
      });
    }
  }
);

module.exports = router;

