const mongoose = require('mongoose');

const ipBlacklistSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tokenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessToken',
    required: true
  },
  reason: {
    type: String,
    trim: true,
    default: 'Blocked by administrator'
  },
  blockedBy: {
    type: String,
    default: 'system'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster lookups
ipBlacklistSchema.index({ ip: 1, tokenId: 1 });
ipBlacklistSchema.index({ isActive: 1 });

ipBlacklistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('IPBlacklist', ipBlacklistSchema);

