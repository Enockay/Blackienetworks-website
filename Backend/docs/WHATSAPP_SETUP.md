# WhatsApp API Setup Guide

## Issue: WhatsApp Messages Not Being Delivered

If you're receiving SMS notifications but not WhatsApp notifications, this is likely because **WhatsApp Business API requires approved message templates** for initial messages to recipients.

## Why WhatsApp Messages Fail

WhatsApp Business API has strict requirements:

1. **Template Messages (Required for First Contact)**: 
   - You must use pre-approved message templates for the first message to any recipient
   - Templates must be created in Brevo and approved by Meta/WhatsApp
   - Free-form messages only work within a 24-hour window after the recipient has replied

2. **Free-form Messages (Only After Conversation Started)**:
   - Can only be sent if the recipient has replied to your message within the last 24 hours
   - Cannot be used for initial contact

## Current Implementation

Our current implementation sends free-form messages (content only), which will fail if:
- The recipient hasn't replied to a previous message within 24 hours
- No approved template exists for the message type

## Solution: Use WhatsApp Templates

### Step 1: Create WhatsApp Template in Brevo

1. Log in to your Brevo account
2. Go to **Campaigns > WhatsApp > Templates**
3. Click **Create Template**
4. Create a template for OTP messages, for example:

**Template Name**: `otp_verification`
**Category**: Transactional
**Language**: English
**Content**:
```
Your Blackie Networks OTP code is: {{1}}

Valid for {{2}} minutes.

⚠️ Do not share this code with anyone.
```

**Variables**:
- `{{1}}` - OTP code (6 digits)
- `{{2}}` - Expiration time (minutes)

5. Submit the template for approval (can take 24-48 hours)

### Step 2: Update Code to Use Template

Once your template is approved, you'll need to:

1. Get the template ID from Brevo
2. Update the OTP service to use the template ID
3. Pass template parameters instead of free-form content

### Step 3: Alternative - Use Conversations API

For free-form messages without templates, you can use Brevo's Conversations API, but this requires:
- An active conversation (recipient must have replied)
- The conversation must be within 24 hours

## Checking WhatsApp Status

To check if your WhatsApp account is properly configured:

1. **Brevo Dashboard**: Go to **Campaigns > Settings > WhatsApp**
2. **Check Connection**: Ensure your WhatsApp Business account is connected
3. **Check Templates**: Verify you have approved templates
4. **Check Credits**: Ensure you have WhatsApp credits available

## Testing

After setting up templates:

1. Create a template in Brevo
2. Wait for approval (24-48 hours)
3. Update the code to use the template ID
4. Test sending OTP via WhatsApp

## Current Error

The API is returning `400 Bad Request` because:
- No approved template exists
- Free-form message cannot be sent (no active conversation)

## Next Steps

1. **Option A (Recommended)**: Create and approve WhatsApp templates in Brevo
2. **Option B**: Use SMS for OTP (currently working)
3. **Option C**: Set up Conversations API for free-form messages (requires active conversations)

## Support

If you need help:
- Brevo Documentation: https://help.brevo.com/hc/en-us/sections/4603827998098-Getting-started-with-WhatsApp-campaigns-in-Brevo
- Brevo API Docs: https://developers.brevo.com/reference/sendwhatsappmessage

