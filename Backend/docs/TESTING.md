# Testing Guide

## Overview

This project includes comprehensive test coverage for:
- Email service functionality
- OTP service (email, SMS, and both channels)
- All API endpoints
- Error handling and validation

## Test Phone Number

All SMS/OTP tests use the phone number: **+254796869402**

## Running Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Set up test database:
   - Default: `mongodb://localhost:27017/blackienetworks-test`
   - Or set `MONGODB_TEST` environment variable

### Commands

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- api.integration.test.js
```

## Test Files

### Unit Tests

- **`tests/emailService.test.js`**
  - Tests booking confirmation emails
  - Tests admin notification emails
  - Tests error handling

- **`tests/otpService.test.js`**
  - Tests OTP generation
  - Tests OTP storage and expiration
  - Tests OTP verification
  - Tests sending via email, SMS, and both

### Integration Tests

- **`tests/api.integration.test.js`**
  - Tests all API endpoints:
    - Health check
    - Token management (CRUD)
    - Notifications (send, bulk, list, stats)
    - Bookings (public booking, list)
    - Templates (CRUD, preview)
    - OTP API (send email, send SMS, send both, verify)
  - Tests authentication and authorization
  - Tests error handling and validation

## API Endpoints Tested

### Health Check
- `GET /health`

### Token Management
- `POST /api/tokens` - Create token
- `GET /api/tokens` - List tokens
- `GET /api/tokens/:id` - Get token
- `PUT /api/tokens/:id` - Update token
- `DELETE /api/tokens/:id` - Delete token

### Notifications
- `POST /api/notifications/send` - Send notification
- `POST /api/notifications/bulk` - Send bulk notifications
- `GET /api/notifications` - List notifications
- `GET /api/notifications/:id` - Get notification
- `GET /api/notifications/stats/summary` - Get statistics

### Bookings
- `POST /api/bookings/book/public` - Create public booking
- `GET /api/bookings` - List bookings

### Templates
- `POST /api/templates` - Create template
- `GET /api/templates` - List templates
- `GET /api/templates/:id` - Get template
- `GET /api/templates/:id/preview` - Preview template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### OTP Service
- `POST /api/otp/send/email` - Send OTP via email
- `POST /api/otp/send/sms` - Send OTP via SMS
- `POST /api/otp/send/both` - Send OTP via both channels
- `POST /api/otp/verify` - Verify OTP

## Mocking

Tests use mocks to avoid actual API calls:
- Brevo API (email and SMS)
- Notification service
- Email service

This ensures:
- Fast test execution
- No external API costs
- Reliable test results
- Tests can run offline

## Test Data

- Test Email: `test@example.com`
- Test Phone: `+254796869402`
- Test Token: Created automatically in `beforeAll` hook

## Continuous Integration

These tests are designed to run in CI/CD pipelines. Make sure to:
1. Set up test database in CI environment
2. Set `NODE_ENV=test`
3. Configure `MONGODB_TEST` environment variable

