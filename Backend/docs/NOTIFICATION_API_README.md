# Blackie Networks Notification API

## 🚀 Quick Start

### 1. Create an Access Token

```bash
POST /api/tokens
Content-Type: application/json

{
  "name": "my-service",
  "description": "Token for my service",
  "allowedChannels": ["email", "sms"],
  "rateLimit": 1000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "12345678-1234-1234-1234-123456789abc",
    "warning": "⚠️ Save this token now. You will not be able to see it again!"
  }
}
```

### 2. Send a Notification

```bash
POST /api/notifications/send
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "channel": "email",
  "recipient": "user@example.com",
  "subject": "Welcome!",
  "message": "<h1>Welcome to Blackie Networks!</h1>"
}
```

## 📚 Full Documentation

Visit: `http://localhost:3010/api-docs` for complete interactive documentation.

## 🔑 Authentication

All requests require an access token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

## 📧 Supported Channels

- **Email**: HTML email via Brevo
- **SMS**: Text messages via Brevo SMS

## 🎯 Key Features

- ✅ Access token authentication
- ✅ Multi-channel support (Email, SMS)
- ✅ Template system with variable substitution
- ✅ Bulk notifications
- ✅ Scheduled notifications
- ✅ Retry mechanism for failed notifications
- ✅ Notification tracking and analytics
- ✅ Rate limiting per token
- ✅ Channel-based permissions

## 📝 Environment Variables

Add to your `.env` file:

```env
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SMS_SENDER=BlackieNet
BREVO_REPLY_TO_EMAIL=support@yourdomain.com
```

## 🔗 API Endpoints

### Notifications
- `POST /api/notifications/send` - Send single notification
- `POST /api/notifications/bulk` - Send bulk notifications
- `GET /api/notifications` - List notifications
- `GET /api/notifications/:id` - Get notification details
- `GET /api/notifications/stats/summary` - Get statistics
- `POST /api/notifications/:id/retry` - Retry failed notification

### Templates
- `POST /api/templates` - Create template
- `GET /api/templates` - List templates
- `GET /api/templates/:id` - Get template
- `GET /api/templates/:id/preview` - Preview template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### Access Tokens
- `POST /api/tokens` - Create token
- `GET /api/tokens` - List tokens
- `GET /api/tokens/:id` - Get token
- `PUT /api/tokens/:id` - Update token
- `DELETE /api/tokens/:id` - Delete token

## 💡 Usage Examples

### Send Email

```javascript
const response = await fetch('http://localhost:3010/api/notifications/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: 'email',
    recipient: 'user@example.com',
    subject: 'Test Email',
    message: '<h1>Hello!</h1><p>This is a test.</p>'
  })
});
```

### Send SMS

```javascript
const response = await fetch('http://localhost:3010/api/notifications/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: 'sms',
    recipient: '+254712345678',
    message: 'Your booking is confirmed!'
  })
});
```

### Use Template

```javascript
const response = await fetch('http://localhost:3010/api/notifications/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: 'email',
    recipient: 'user@example.com',
    templateId: 'template-id-here',
    templateData: {
      customerName: 'John Doe',
      serviceName: 'Network Setup',
      bookingDate: '2024-12-25'
    }
  })
});
```

## 🛡️ Security

- Access tokens are required for all requests
- Tokens can be scoped to specific channels
- Rate limiting per token
- Token expiration support
- Usage tracking

## 📊 Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": { ... }
}
```

## 🔍 Error Codes

- `UNAUTHORIZED` (401) - Missing or invalid token
- `CHANNEL_NOT_ALLOWED` (403) - Token doesn't have channel permission
- `VALIDATION_ERROR` (400) - Request validation failed
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `NOT_FOUND` (404) - Resource not found
- `INTERNAL_ERROR` (500) - Server error

## 📖 Full Documentation

For complete API documentation with examples, visit:
**http://localhost:3010/api-docs**

