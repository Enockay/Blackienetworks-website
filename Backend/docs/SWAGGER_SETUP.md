# Swagger API Documentation Setup

## Overview

This project uses Swagger (OpenAPI 3.0) for interactive API documentation. The documentation is automatically generated from JSDoc comments in the route files.

## Accessing the Documentation

Once the server is running, access the Swagger UI at:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Swagger JSON**: `http://localhost:3000/api-docs.json`

## Features

- ✅ Interactive API documentation
- ✅ Try-it-out functionality (test endpoints directly)
- ✅ Request/response schemas
- ✅ Authentication support (Bearer token)
- ✅ All endpoints documented:
  - Health check
  - Token management
  - Notifications (email, SMS, bulk)
  - Bookings
  - Templates
  - OTP service (email, SMS, both, verify)

## Using the Documentation

### 1. Authentication

Most endpoints require authentication. To use them:

1. Create an access token via `POST /api/tokens`
2. Copy the token from the response
3. Click the "Authorize" button in Swagger UI
4. Enter your token (without "Bearer" prefix)
5. Click "Authorize" and "Close"

Now you can test authenticated endpoints!

### 2. Testing Endpoints

1. Find the endpoint you want to test
2. Click "Try it out"
3. Fill in the required parameters
4. Click "Execute"
5. View the response below

### 3. Example: Send OTP via SMS

1. Go to `POST /api/otp/send/sms`
2. Click "Try it out"
3. Enter your token in the Authorization field (or use the Authorize button)
4. Enter phone number: `+254796869402`
5. Click "Execute"
6. View the response (OTP will be included in test environment)

## Adding Documentation to New Endpoints

To document a new endpoint, add JSDoc comments above the route handler:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Brief description
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: value
 *     responses:
 *       200:
 *         description: Success response
 */
router.post('/your-endpoint', handler);
```

## Configuration

Swagger configuration is in `/utils/swagger.js`. You can customize:

- API title and description
- Server URLs
- Security schemes
- Response schemas
- Tags and categories

## Dependencies

- `swagger-ui-express` - Serves the Swagger UI
- `swagger-jsdoc` - Parses JSDoc comments to generate OpenAPI spec

## Production

In production, you may want to:

1. Restrict access to `/api-docs` (add authentication)
2. Update server URLs in the Swagger config
3. Hide sensitive endpoints
4. Add rate limiting to the docs endpoint

## Troubleshooting

### Documentation not showing

- Make sure the server is running
- Check that JSDoc comments are properly formatted
- Verify routes are included in `apis` array in `swagger.js`

### Authentication not working

- Make sure you're using the correct token format
- Check that the token has the required channel permissions
- Verify the token hasn't expired

### Endpoints missing

- Ensure route files are in the `apis` array: `['./routes/*.js']`
- Check that JSDoc comments are above the route handler
- Verify the route file is being loaded in `app.js`

