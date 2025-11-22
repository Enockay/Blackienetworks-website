const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const accessTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date
  },
  usageCount: {
    type: Number,
    default: 0
  },
  rateLimit: {
    type: Number,
    default: 1000, // requests per hour
  },
  allowedChannels: {
    type: [String],
    enum: ['email', 'sms', 'push', 'whatsapp'],
    default: ['email', 'sms']
  },
  metadata: {
    type: Map,
    of: String
  },
  createdBy: {
    type: String,
    default: 'system'
  },
  expiresAt: {
    type: Date,
    default: null // null means never expires
  }
}, {
  timestamps: true
});

// Index for faster lookups
accessTokenSchema.index({ token: 1 });
accessTokenSchema.index({ isActive: 1 });

// Method to check if token is valid
accessTokenSchema.methods.isValid = function() {
  if (!this.isActive) return false;
  if (this.expiresAt && this.expiresAt < new Date()) return false;
  return true;
};

// Method to record usage
accessTokenSchema.methods.recordUsage = async function() {
  this.lastUsed = new Date();
  this.usageCount += 1;
  await this.save();
};

accessTokenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // Don't expose token in JSON responses for security
    if (returnedObject.token) {
      returnedObject.token = returnedObject.token.substring(0, 8) + '...';
    }
  }
});

module.exports = mongoose.model('AccessToken', accessTokenSchema);

