# Brevo Email Setup Guide

This guide will help you set up Brevo (formerly Sendinblue) email functionality for the booking system.

## Prerequisites

1. A Brevo account (sign up at https://www.brevo.com/)
2. A verified sender email address in your Brevo account

## Step 1: Get Your Brevo API Key

1. Log into your Brevo account
2. Navigate to **Settings** → **SMTP & API** → **API Keys**
3. Click **Generate a new API key**
4. Give it a name (e.g., "Backend Integration")
5. Copy the API key immediately (you won't be able to see it again)

## Step 2: Verify Your Sender Email

1. In Brevo, go to **Settings** → **SMTP & API** → **Senders**
2. Click **Add a sender**
3. Enter your email address (e.g., `noreply@yourdomain.com`)
4. Verify the email address by clicking the verification link sent to your inbox

## Step 3: Configure Environment Variables

Create a `.env` file in the Backend directory (or add to your existing one) with the following variables:

```env
# Brevo API Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_REPLY_TO_EMAIL=support@yourdomain.com

# Admin Email (where booking notifications will be sent)
ADMIN_EMAIL=admin@yourdomain.com

# Other existing variables
MONGODB=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
```

### Required Environment Variables:

- **BREVO_API_KEY**: Your Brevo API key from Step 1
- **BREVO_SENDER_EMAIL**: The verified sender email from Step 2
- **ADMIN_EMAIL**: Email address where you want to receive booking notifications
- **BREVO_REPLY_TO_EMAIL** (Optional): Email address for replies (defaults to sender email if not set)

## Step 4: Test the Integration

1. Start your backend server:
   ```bash
   npm start
   ```

2. Make a test booking through your frontend or use the API endpoint:
   ```bash
   POST http://localhost:3000/api/bookings/book/public
   ```

3. Check:
   - Your email inbox for the confirmation email
   - The admin email for the notification
   - Server logs for any errors

## API Endpoints

### Public Booking (No Authentication Required)
```
POST /api/bookings/book/public
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254712345678",
  "service": "Network Setup and Infrastructure",
  "date": "2024-12-25",
  "time": "14:00",
  "description": "Need help setting up network infrastructure"
}
```

### Authenticated Booking
```
POST /api/bookings/book
```
(Requires authentication token)

## Email Templates

The system sends two types of emails:

1. **Booking Confirmation** - Sent to the customer
   - Confirms their booking details
   - Includes service, date, time, and requirements
   - Professional HTML template with Blackie Networks branding

2. **Admin Notification** - Sent to the admin email
   - Notifies about new bookings
   - Includes all customer and booking details

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `BREVO_API_KEY` is set correctly in your `.env` file
2. **Check Sender Email**: The sender email must be verified in Brevo
3. **Check Logs**: Look for error messages in your server console
4. **API Limits**: Free Brevo accounts have daily sending limits (300 emails/day)

### Common Errors

- **"Invalid API key"**: Check that your API key is correct and active
- **"Sender not verified"**: Verify your sender email in Brevo dashboard
- **"Daily limit exceeded"**: Upgrade your Brevo plan or wait for the limit to reset

## Brevo Account Limits

- **Free Plan**: 300 emails/day
- **Lite Plan**: 10,000 emails/month
- **Premium Plans**: Higher limits available

For production use, consider upgrading your Brevo plan based on your expected email volume.

## Support

- Brevo Documentation: https://developers.brevo.com/
- Brevo Support: https://help.brevo.com/

