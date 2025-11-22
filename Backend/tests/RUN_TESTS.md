# How to Run Tests

## ⚠️ Important: Use npm test, NOT node directly!

Tests must be run using Jest through npm. Do NOT run test files directly with `node`.

## ✅ Correct Way to Run Tests

```bash
# Navigate to Backend directory
cd Backend

# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run a specific test file
npm test -- emailService.test.js
npm test -- otpService.test.js
npm test -- api.integration.test.js
```

## ❌ Wrong Way (Don't Do This)

```bash
# This will NOT work - jest is not defined
node tests/emailService.test.js
```

## Environment Setup

1. Make sure you have a `.env` file in the Backend directory with:
   ```env
   MONGODB=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   BREVO_API_KEY=your_brevo_api_key (optional for tests)
   ```

2. Tests will automatically load your `.env` file

3. For integration tests, make sure MongoDB is running and accessible

## Test Phone Number

All SMS/OTP tests use: **+254796869402**

## Troubleshooting

### Error: "jest is not defined"
- **Solution**: Use `npm test` instead of `node tests/...`

### Error: "Cannot find module"
- **Solution**: Run `npm install` to install dependencies

### Error: MongoDB connection failed
- **Solution**: Make sure MongoDB is running and `MONGODB` in `.env` is correct

### Tests are slow
- This is normal for integration tests. They connect to a real database.
- Unit tests (emailService, otpService) should be fast.

## What Gets Tested

✅ Email service (booking confirmations, admin notifications)  
✅ OTP service (email, SMS, both channels, verification)  
✅ All API endpoints (tokens, notifications, bookings, templates, OTP)  
✅ Error handling and validation  
✅ Authentication and authorization  

