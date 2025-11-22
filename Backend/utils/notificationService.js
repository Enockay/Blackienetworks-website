const brevo = require('@getbrevo/brevo');
const Notification = require('../models/notification');
const NotificationTemplate = require('../models/notificationTemplate');

// Initialize Brevo API clients
const emailApiInstance = new brevo.TransactionalEmailsApi();
const smsApiInstance = new brevo.TransactionalSMSApi();

// Set API key if available
if (process.env.BREVO_API_KEY) {
  emailApiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  smsApiInstance.setApiKey(brevo.TransactionalSMSApiApiKeys.apiKey, process.env.BREVO_API_KEY);
}

/**
 * Send email notification via Brevo
 */
const sendEmail = async (notification, templateData = {}) => {
  try {
    let subject = notification.subject || 'Notification from Blackie Networks';
    let htmlContent = notification.message;

    // If template is provided, render it
    if (notification.templateId) {
      const template = await NotificationTemplate.findById(notification.templateId);
      if (template && template.isActive) {
        const rendered = template.render(templateData);
        subject = rendered.subject || subject;
        htmlContent = rendered.body;
      }
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Blackie Networks',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com'
    };
    sendSmtpEmail.to = [{ 
      email: notification.recipient,
      name: notification.recipientName || notification.recipient
    }];

    if (process.env.BREVO_REPLY_TO_EMAIL) {
      sendSmtpEmail.replyTo = {
        email: process.env.BREVO_REPLY_TO_EMAIL,
        name: 'Blackie Networks Support'
      };
    }

    const result = await emailApiInstance.sendTransacEmail(sendSmtpEmail);
    
    // Update notification
    notification.status = 'sent';
    notification.messageId = result.body?.messageId;
    notification.sentAt = new Date();
    notification.providerResponse = {
      messageId: result.body?.messageId,
      statusCode: result.response?.statusCode
    };
    await notification.save();

    return {
      success: true,
      messageId: result.body?.messageId,
      channel: 'email'
    };
  } catch (error) {
    notification.status = 'failed';
    notification.errorMessage = error.message || error.toString();
    notification.providerResponse = {
      error: error.message,
      statusCode: error.statusCode
    };
    await notification.save();

    throw error;
  }
};

/**
 * Send SMS notification via Brevo
 */
const sendSMS = async (notification, templateData = {}) => {
  try {
    let message = notification.message;

    // If template is provided, render it
    if (notification.templateId) {
      const template = await NotificationTemplate.findById(notification.templateId);
      if (template && template.isActive) {
        const rendered = template.render(templateData);
        message = rendered.body;
      }
    }

    // Brevo SMS API
    const sendTransacSms = new brevo.SendTransacSms();
    sendTransacSms.sender = process.env.BREVO_SMS_SENDER || 'BlackieNet';
    sendTransacSms.recipient = notification.recipient; // Phone number with country code (E.164 format)
    sendTransacSms.content = message;
    sendTransacSms.type = 'transactional'; // Transactional SMS

    const result = await smsApiInstance.sendTransacSms(sendTransacSms);

    // Update notification
    notification.status = 'sent';
    notification.messageId = result.body?.messageId?.toString();
    notification.sentAt = new Date();
    notification.providerResponse = {
      messageId: result.body?.messageId,
      statusCode: result.response?.statusCode
    };
    await notification.save();

    return {
      success: true,
      messageId: result.body?.messageId,
      channel: 'sms'
    };
  } catch (error) {
    notification.status = 'failed';
    notification.errorMessage = error.message || error.toString();
    notification.providerResponse = {
      error: error.message,
      statusCode: error.statusCode
    };
    await notification.save();

    throw error;
  }
};

/**
 * Main notification sending function
 */
const sendNotification = async (accessTokenId, channel, recipient, options = {}) => {
  const {
    recipientName,
    subject,
    message,
    templateId,
    templateData = {},
    metadata = {},
    scheduledFor = null
  } = options;

  // Create notification record
  const notification = new Notification({
    accessTokenId,
    channel,
    recipient,
    recipientName,
    subject,
    message,
    templateId,
    templateData,
    metadata,
    scheduledFor
  });

  await notification.save();

  // If scheduled for future, don't send now
  if (scheduledFor && new Date(scheduledFor) > new Date()) {
    return {
      success: true,
      notificationId: notification._id.toString(),
      status: 'scheduled',
      scheduledFor: scheduledFor
    };
  }

  // Send based on channel
  try {
    let result;
    switch (channel.toLowerCase()) {
      case 'email':
        result = await sendEmail(notification, templateData);
        break;
      case 'sms':
        result = await sendSMS(notification, templateData);
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }

    return {
      success: true,
      notificationId: notification._id.toString(),
      messageId: result.messageId,
      status: 'sent',
      channel: result.channel
    };
  } catch (error) {
    // Retry logic
    if (notification.retryCount < notification.maxRetries) {
      notification.retryCount += 1;
      await notification.save();
      
      // Exponential backoff: wait 2^retryCount seconds
      const delay = Math.pow(2, notification.retryCount) * 1000;
      setTimeout(async () => {
        try {
          await sendNotification(accessTokenId, channel, recipient, options);
        } catch (retryError) {
          console.error(`Retry failed for notification ${notification._id}:`, retryError.message);
        }
      }, delay);
    }

    return {
      success: false,
      notificationId: notification._id.toString(),
      status: 'failed',
      error: error.message
    };
  }
};

/**
 * Send bulk notifications
 */
const sendBulkNotifications = async (accessTokenId, notifications) => {
  const results = [];
  
  for (const notif of notifications) {
    try {
      const result = await sendNotification(
        accessTokenId,
        notif.channel,
        notif.recipient,
        {
          recipientName: notif.recipientName,
          subject: notif.subject,
          message: notif.message,
          templateId: notif.templateId,
          templateData: notif.templateData,
          metadata: notif.metadata,
          scheduledFor: notif.scheduledFor
        }
      );
      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        recipient: notif.recipient,
        error: error.message
      });
    }
  }

  return {
    total: notifications.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results
  };
};

module.exports = {
  sendNotification,
  sendBulkNotifications,
  sendEmail,
  sendSMS
};

