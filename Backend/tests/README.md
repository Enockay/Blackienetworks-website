# Test Suite

This directory contains all test files for the Blackie Networks Backend API.

## Test Files

- `emailService.test.js` - Unit tests for email service
- `otpService.test.js` - Unit tests for OTP service
- `api.integration.test.js` - Integration tests for all API endpoints

## Running Tests

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npm test -- emailService.test.js
npm test -- otpService.test.js
npm test -- api.integration.test.js
```

## Test Environment Setup

Before running integration tests, make sure you have:

1. A test MongoDB database (default: `mongodb://localhost:27017/blackienetworks-test`)
2. Set `MONGODB_TEST` environment variable if using a different database
3. All required environment variables set (see `.env.example`)

## Test Phone Number

The integration tests use the phone number `+254796869402` for SMS/OTP testing as specified.

## Mocking

The tests use mocks for:
- Brevo API (email and SMS services)
- Notification service (to avoid actual API calls during testing)

## Test Coverage

The test suite covers:
- ✅ Email service (booking confirmations, admin notifications)
- ✅ OTP service (email, SMS, both channels, verification)
- ✅ All API endpoints (tokens, notifications, bookings, templates, OTP)
- ✅ Error handling and validation
- ✅ Authentication and authorization

