const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  accessTokenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessToken',
    required: true
  },
  channel: {
    type: String,
    enum: ['email', 'sms', 'push', 'whatsapp'],
    required: true
  },
  recipient: {
    type: String,
    required: true // email address or phone number
  },
  recipientName: {
    type: String
  },
  subject: {
    type: String, // For email
  },
  message: {
    type: String,
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NotificationTemplate',
    default: null
  },
  templateData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed', 'bounced'],
    default: 'pending'
  },
  providerResponse: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  messageId: {
    type: String // Provider message ID (Brevo message ID, etc.)
  },
  errorMessage: {
    type: String
  },
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  },
  scheduledFor: {
    type: Date,
    default: null // null means send immediately
  },
  sentAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for faster queries
notificationSchema.index({ accessTokenId: 1, createdAt: -1 });
notificationSchema.index({ status: 1 });
notificationSchema.index({ channel: 1 });
notificationSchema.index({ recipient: 1 });
notificationSchema.index({ scheduledFor: 1, status: 1 });

notificationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Notification', notificationSchema);

