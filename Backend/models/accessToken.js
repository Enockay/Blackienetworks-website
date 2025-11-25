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
  },
  assignedServers: [{
    serverName: {
      type: String,
      required: true,
      trim: true
    },
    serverId: {
      type: String,
      required: true,
      trim: true,
      unique: false // Can be same across different tokens
    },
    serverIP: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    lastUsed: {
      type: Date
    },
    usageCount: {
      type: Number,
      default: 0
    }
  }],
  maxServers: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
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
accessTokenSchema.methods.recordUsage = async function(serverId = null) {
  this.lastUsed = new Date();
  this.usageCount += 1;
  
  // If serverId is provided, update that server's usage
  if (serverId) {
    const server = this.assignedServers.find(s => s.serverId === serverId);
    if (server) {
      server.lastUsed = new Date();
      server.usageCount = (server.usageCount || 0) + 1;
    }
  }
  
  await this.save();
};

// Method to assign a server to this token
accessTokenSchema.methods.assignServer = async function(serverData) {
  // Check if server limit is reached
  if (this.assignedServers.length >= this.maxServers) {
    throw new Error(`Maximum server limit (${this.maxServers}) reached for this token`);
  }
  
  // Check if server is already assigned
  const existingServer = this.assignedServers.find(
    s => s.serverId === serverData.serverId
  );
  
  if (existingServer) {
    // Update existing server info
    Object.assign(existingServer, {
      serverName: serverData.serverName || existingServer.serverName,
      serverIP: serverData.serverIP || existingServer.serverIP,
      description: serverData.description || existingServer.description,
      assignedAt: existingServer.assignedAt // Keep original assignment date
    });
  } else {
    // Add new server
    this.assignedServers.push({
      serverName: serverData.serverName,
      serverId: serverData.serverId,
      serverIP: serverData.serverIP,
      description: serverData.description,
      assignedAt: new Date(),
      lastUsed: null,
      usageCount: 0
    });
  }
  
  await this.save();
  return this;
};

// Method to remove a server assignment
accessTokenSchema.methods.removeServer = async function(serverId) {
  this.assignedServers = this.assignedServers.filter(
    s => s.serverId !== serverId
  );
  await this.save();
  return this;
};

// Method to check if a server is assigned
accessTokenSchema.methods.isServerAssigned = function(serverId) {
  return this.assignedServers.some(s => s.serverId === serverId);
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

