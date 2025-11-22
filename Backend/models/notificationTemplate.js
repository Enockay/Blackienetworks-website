const mongoose = require('mongoose');

const notificationTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  channel: {
    type: String,
    enum: ['email', 'sms', 'push', 'whatsapp'],
    required: true
  },
  subject: {
    type: String, // For email templates
  },
  body: {
    type: String,
    required: true // HTML for email, plain text for SMS
  },
  variables: {
    type: [String], // List of variables like {{name}}, {{date}}, etc.
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: 'general'
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Indexes
notificationTemplateSchema.index({ name: 1 });
notificationTemplateSchema.index({ channel: 1, isActive: 1 });

// Method to render template with data
notificationTemplateSchema.methods.render = function(data = {}) {
  let rendered = this.body;
  let renderedSubject = this.subject || '';

  // Replace variables in format {{variableName}}
  this.variables.forEach(variable => {
    const regex = new RegExp(`\\{\\{${variable}\\}\\}`, 'g');
    const value = data[variable] || '';
    rendered = rendered.replace(regex, value);
    renderedSubject = renderedSubject.replace(regex, value);
  });

  return {
    body: rendered,
    subject: renderedSubject
  };
};

notificationTemplateSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('NotificationTemplate', notificationTemplateSchema);

