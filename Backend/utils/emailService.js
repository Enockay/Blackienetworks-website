const brevo = require('@getbrevo/brevo');

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key if available
if (process.env.BREVO_API_KEY) {
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
} else {
    console.warn('BREVO_API_KEY not set in environment variables. Email functionality will not work.');
}

/**
 * Send booking confirmation email to user
 * @param {Object} bookingData - Booking information
 * @param {string} bookingData.name - User's name
 * @param {string} bookingData.email - User's email
 * @param {string} bookingData.service - Service name
 * @param {Date} bookingData.date - Booking date
 * @param {string} bookingData.time - Booking time
 * @param {string} bookingData.description - Booking description
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendBookingConfirmation = async (bookingData) => {
  let email;
  try {
    const { name, service, date, time, description } = bookingData;
    email = bookingData.email;

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Format the time
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Create email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            margin: -30px -30px 30px -30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            margin: 20px 0;
          }
          .info-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #00f0ff;
          }
          .info-label {
            font-weight: bold;
            color: #0066ff;
            margin-bottom: 5px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for booking a consultation with Blackie Networks. Your booking has been confirmed!</p>
            
            <div class="info-box">
              <div class="info-label">Service:</div>
              <div>${service}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Date:</div>
              <div>${formattedDate}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Time:</div>
              <div>${formattedTime}</div>
            </div>
            
            ${description ? `
            <div class="info-box">
              <div class="info-label">Your Requirements:</div>
              <div>${description}</div>
            </div>
            ` : ''}
            
            <p>We will contact you shortly to confirm the details and answer any questions you may have.</p>
            
            <p>If you need to make any changes or have questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            <strong>Blackie Networks Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Brevo
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'Booking Confirmation - Blackie Networks';
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = {
      name: 'Blackie Networks',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com'
    };
    sendSmtpEmail.to = [{ email, name }];
    
    // Optional: Add reply-to
    if (process.env.BREVO_REPLY_TO_EMAIL) {
      sendSmtpEmail.replyTo = {
        email: process.env.BREVO_REPLY_TO_EMAIL,
        name: 'Blackie Networks Support'
      };
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Booking confirmation email sent to ${email} (Message ID: ${result.body?.messageId || 'N/A'})`);
    return result;
  } catch (error) {
    console.error(`❌ Error sending booking confirmation to ${email}:`, error.message || error);
    throw error;
  }
};

/**
 * Send notification email to admin about new booking
 * @param {Object} bookingData - Booking information
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendAdminNotification = async (bookingData) => {
  let adminEmail;
  try {
    const { name, email, phone, service, date, time, description } = bookingData;

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Format the time
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    adminEmail = process.env.ADMIN_EMAIL || process.env.BREVO_SENDER_EMAIL;

    if (!adminEmail) {
      console.warn('Admin email not configured. Skipping admin notification.');
      return;
    }

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            border: 2px solid #00f0ff;
          }
          .header {
            background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            margin: -30px -30px 30px -30px;
          }
          .info-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #0066ff;
          }
          .info-label {
            font-weight: bold;
            color: #0066ff;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking Received</h1>
          </div>
          <div>
            <p><strong>New booking has been submitted:</strong></p>
            
            <div class="info-box">
              <div class="info-label">Customer Name:</div>
              <div>${name}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Email:</div>
              <div>${email}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Phone:</div>
              <div>${phone || 'Not provided'}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Service:</div>
              <div>${service}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Date:</div>
              <div>${formattedDate}</div>
            </div>
            
            <div class="info-box">
              <div class="info-label">Time:</div>
              <div>${formattedTime}</div>
            </div>
            
            ${description ? `
            <div class="info-box">
              <div class="info-label">Requirements:</div>
              <div>${description}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `New Booking: ${service} - ${name}`;
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = {
      name: 'Blackie Networks Booking System',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com'
    };
    sendSmtpEmail.to = [{ email: adminEmail }];

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Admin notification sent to ${adminEmail} (Message ID: ${result.body?.messageId || 'N/A'})`);
    return result;
  } catch (error) {
    console.error(`❌ Error sending admin notification to ${adminEmail}:`, error.message || error);
    throw error;
  }
};

/**
 * Send access token credentials email to user
 * @param {Object} tokenData - Token information
 * @param {string} tokenData.userEmail - User's email
 * @param {string} tokenData.userName - User's name (optional)
 * @param {string} tokenData.token - Access token
 * @param {string} tokenData.tokenName - Token name
 * @param {string} tokenData.description - Token description
 * @param {Array} tokenData.allowedChannels - Allowed channels
 * @param {number} tokenData.rateLimit - Rate limit
 * @param {Date} tokenData.expiresAt - Expiration date
 * @param {Array} tokenData.assignedServers - Assigned servers
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendTokenCredentials = async (tokenData) => {
  let email;
  try {
    const {
      userEmail,
      userName,
      token,
      tokenName,
      description,
      allowedChannels = [],
      rateLimit,
      expiresAt,
      assignedServers = [],
      maxServers = 5
    } = tokenData;

    email = userEmail;

    if (!email) {
      console.warn('User email not provided. Skipping token credentials email.');
      return;
    }

    // Format expiration date
    const formattedExpiry = expiresAt 
      ? new Date(expiresAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'Never expires';

    // Format creation date
    const formattedCreated = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Get API base URL for docs link
    const apiBaseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 3002}`;
    // Try Swagger first, fallback to static HTML
    const apiDocsUrl = `${apiBaseUrl}/api-docs.html`;

    // Create email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 5px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
            color: white;
            padding: 12px;
            border-radius: 8px 8px 0 0;
            text-align: center;
            margin: -20px -20px 15px -20px;
          }
          .header h1 {
            margin: 0;
            font-size: 18px;
          }
          .content {
            margin: 15px 0;
          }
          .content p {
            font-size: 12px;
            margin: 8px 0;
          }
          .token-box {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 5px;
            margin: 12px 0;
            border: 2px solid #00f0ff;
            word-break: break-all;
          }
          .token-code {
            font-family: 'Courier New', monospace;
            font-size: 11px;
            color: #0066ff;
            font-weight: bold;
            background-color: #ffffff;
            padding: 8px;
            border-radius: 4px;
            border: 1px dashed #00f0ff;
          }
          .info-box {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 4px solid #00f0ff;
          }
          .info-label {
            font-weight: bold;
            color: #0066ff;
            margin-bottom: 3px;
            font-size: 11px;
          }
          .info-value {
            color: #333;
            font-size: 11px;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 12px 0;
            border-radius: 4px;
            font-size: 11px;
          }
          .warning-box strong {
            color: #856404;
            font-size: 11px;
          }
          .warning-box ul {
            margin: 6px 0;
            padding-left: 18px;
          }
          .warning-box li {
            margin: 4px 0;
            font-size: 11px;
          }
          .warning-box code {
            background: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 10px;
          }
          .server-list {
            margin-top: 6px;
            padding-left: 16px;
          }
          .server-item {
            margin: 3px 0;
            color: #666;
            font-size: 10px;
          }
          .footer {
            margin-top: 20px;
            padding-top: 12px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 10px;
          }
          .footer p {
            margin: 4px 0;
            font-size: 10px;
          }
          .button {
            display: inline-block;
            padding: 8px 20px;
            background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 12px 0;
            font-size: 11px;
          }
          .docs-box {
            background-color: #e7f3ff;
            padding: 10px;
            border-radius: 5px;
            margin: 12px 0;
            border-left: 4px solid #0066ff;
          }
          .docs-box .info-label {
            font-size: 11px;
          }
          .docs-box p {
            margin: 6px 0 0 0;
            color: #333;
            font-size: 11px;
          }
          .docs-link {
            color: #0066ff;
            text-decoration: none;
            font-weight: bold;
            font-size: 11px;
          }
          .docs-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔑 Your Access Token Credentials</h1>
          </div>
          <div class="content">
            <p>Dear ${userName || 'User'},</p>
            <p>Your access token has been generated successfully. Please find your credentials below:</p>
            
            <div class="token-box">
              <div class="info-label">Access Token:</div>
              <div class="token-code">${token}</div>
              <p style="margin-top: 8px; font-size: 10px; color: #666;">
                ⚠️ <strong>Important:</strong> Save this token securely. You will not be able to see it again after closing this email.
              </p>
            </div>

            <div class="info-box">
              <div class="info-label">Token Name:</div>
              <div class="info-value">${tokenName}</div>
            </div>

            ${description ? `
            <div class="info-box">
              <div class="info-label">Description:</div>
              <div class="info-value">${description}</div>
            </div>
            ` : ''}

            <div class="info-box">
              <div class="info-label">Allowed Channels:</div>
              <div class="info-value">${allowedChannels.length > 0 ? allowedChannels.join(', ') : 'None specified'}</div>
            </div>

            <div class="info-box">
              <div class="info-label">Rate Limit:</div>
              <div class="info-value">${rateLimit || 'Not specified'} requests per hour</div>
            </div>

            <div class="info-box">
              <div class="info-label">Expires At:</div>
              <div class="info-value">${formattedExpiry}</div>
            </div>

            <div class="info-box">
              <div class="info-label">Created At:</div>
              <div class="info-value">${formattedCreated}</div>
            </div>

            ${assignedServers && assignedServers.length > 0 ? `
            <div class="info-box">
              <div class="info-label">Assigned Servers (${assignedServers.length}/${maxServers}):</div>
              <div class="server-list">
                ${assignedServers.map(server => `
                  <div class="server-item">• ${server.serverName || server.serverId}${server.serverIP ? ` (${server.serverIP})` : ''}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <div class="warning-box">
              <strong>⚠️ Security Reminders:</strong>
              <ul>
                <li>Keep your access token secure and never share it publicly</li>
                <li>Include the token in the Authorization header: <code>Authorization: Bearer ${token.substring(0, 20)}...</code></li>
                ${assignedServers && assignedServers.length > 0 ? '<li>Include your server ID in the X-Server-Id header when making requests</li>' : ''}
                <li>If your token expires or is compromised, contact the administrator to generate a new one</li>
              </ul>
            </div>

            <div class="docs-box">
              <div class="info-label">📚 API Documentation:</div>
              <p>
                View our complete API documentation with all available endpoints, request/response examples, and integration guides:
                <br>
                <a href="${apiDocsUrl}" class="docs-link" target="_blank">${apiDocsUrl}</a>
              </p>
            </div>

            <div style="background-color: #e7f3ff; padding: 10px; border-radius: 5px; margin: 12px 0; border-left: 4px solid #0066ff;">
              <div class="info-label">Need a New Token?</div>
              <p style="margin: 6px 0 0 0; color: #333; font-size: 11px;">
                If you need to generate a new access token, please contact your administrator or visit the admin dashboard.
              </p>
            </div>

            <p style="font-size: 11px;">If you have any questions or concerns about your access token, please don't hesitate to contact us.</p>
            
            <p style="font-size: 11px;">Best regards,<br>
            <strong>Blackie Networks Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email containing sensitive credentials. Please keep this information secure.</p>
            <p>&copy; ${new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Brevo
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `Access Token Credentials - ${tokenName}`;
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = {
      name: 'Blackie Networks',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com'
    };
    sendSmtpEmail.to = [{ 
      email, 
      name: userName || email.split('@')[0] 
    }];
    
    // Optional: Add reply-to
    if (process.env.BREVO_REPLY_TO_EMAIL) {
      sendSmtpEmail.replyTo = {
        email: process.env.BREVO_REPLY_TO_EMAIL,
        name: 'Blackie Networks Support'
      };
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Token credentials email sent to ${email} (Message ID: ${result.body?.messageId || 'N/A'})`);
    return result;
  } catch (error) {
    console.error(`❌ Error sending token credentials to ${email}:`, error.message || error);
    throw error;
  }
};

/**
 * Send acknowledgement email to user after they submit the contact form
 * @param {Object} contactData
 * @param {string} contactData.fullName
 * @param {string} contactData.email
 * @param {string} [contactData.service]
 * @returns {Promise<void>}
 */
const sendContactAcknowledgement = async (contactData) => {
  let recipientEmail;
  try {
    const { fullName, email, service } = contactData;
    recipientEmail = email;

    if (!recipientEmail) {
      console.warn('Contact email not provided. Skipping contact acknowledgement email.');
      return;
    }

    const safeName = fullName || 'Customer';

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .container {
            background-color: #ffffff;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
            border: 1px solid #e5e7eb;
          }
          .header {
            border-radius: 10px 10px 0 0;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .title {
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #0f172a;
          }
          .subtitle {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
          }
          .footer {
            margin-top: 24px;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">We’ve received your message ✅</h1>
            <p class="subtitle">Thank you for reaching out to Blackie Networks.</p>
          </div>
          <p>Hi ${safeName},</p>
          <p>
            Thank you for contacting <strong>Blackie Networks</strong>${
              service ? ` about <strong>${service}</strong>` : ''
            }. Our team has received your message and we’ll get back to you
            within <strong>2 working hours</strong>.
          </p>
          <p>
            If your request is urgent, you can also reach us on:
          </p>
          <ul>
            <li><strong>Phone:</strong> +254 796 869 402</li>
            <li><strong>Email:</strong> support@blackie-networks.com</li>
          </ul>
          <p>We look forward to speaking with you.</p>
          <p>Best regards,<br /><strong>Blackie Networks Team</strong></p>
          <div class="footer">
            <p>This is an automated message confirming we received your enquiry.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'We’ve received your message - Blackie Networks';
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = {
      name: 'Blackie Networks',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com',
    };
    sendSmtpEmail.to = [{ email: recipientEmail, name: safeName }];

    if (process.env.BREVO_REPLY_TO_EMAIL) {
      sendSmtpEmail.replyTo = {
        email: process.env.BREVO_REPLY_TO_EMAIL,
        name: 'Blackie Networks Support',
      };
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      `✅ Contact acknowledgement email sent to ${recipientEmail} (Message ID: ${
        result.body?.messageId || 'N/A'
      })`
    );
    return result;
  } catch (error) {
    console.error(
      `❌ Error sending contact acknowledgement to ${recipientEmail}:`,
      error.message || error
    );
    throw error;
  }
};

/**
 * Send contact form notification email to admin
 * @param {Object} contactData
 * @param {string} contactData.fullName
 * @param {string} [contactData.company]
 * @param {string} contactData.email
 * @param {string} contactData.phone
 * @param {string} contactData.service
 * @param {string} [contactData.budget]
 * @param {string} contactData.message
 * @returns {Promise<void>}
 */
const sendContactNotificationToAdmin = async (contactData) => {
  let adminEmail;
  try {
    const { fullName, company, email, phone, service, budget, message } = contactData;

    // Primary recipient for contact notifications (support inbox)
    adminEmail = process.env.CONTACT_ADMIN_EMAIL || 'support@blackie-networks.com';

    // Second recipient (actual admin inbox)
    const ccEmail = process.env.CONTACT_ADMIN_CC_EMAIL || 'enockaymwema@gmail.com';

    if (!adminEmail) {
      console.warn('Admin email not configured. Skipping contact notification.');
      return;
    }

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .container {
            background-color: #ffffff;
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
          }
          .header {
            padding-bottom: 12px;
            margin-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
          }
          .header h1 {
            margin: 0 0 4px 0;
            font-size: 20px;
          }
          .meta {
            font-size: 13px;
            color: #6b7280;
          }
          .label {
            font-weight: 600;
            color: #374151;
          }
          .value {
            margin: 2px 0 8px 0;
          }
          .message-box {
            margin-top: 12px;
            padding: 12px;
            border-radius: 8px;
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <div class="meta">${new Date().toLocaleString()}</div>
          </div>
          <p><span class="label">Name:</span> ${fullName}</p>
          ${company ? `<p><span class="label">Company:</span> ${company}</p>` : ''}
          <p><span class="label">Email:</span> ${email}</p>
          <p><span class="label">Phone:</span> ${phone}</p>
          <p><span class="label">Service Interested In:</span> ${service}</p>
          ${budget ? `<p><span class="label">Budget Range:</span> ${budget}</p>` : ''}
          <div class="message-box">
            <div class="label">Message / Project Description:</div>
            <div class="value">${message}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Single transactional email sent to both support and admin inboxes
    const notifyEmail = new brevo.SendSmtpEmail();
    notifyEmail.subject = `New Contact Form: ${fullName} - ${service}`;
    notifyEmail.htmlContent = emailContent;
    notifyEmail.sender = {
      name: 'Blackie Networks Website',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@blackienetworks.com',
    };

    // Both recipients get the same email
    const recipients = [{ email: adminEmail }];
    if (ccEmail) {
      recipients.push({ email: ccEmail });
    }
    notifyEmail.to = recipients;

    const result = await apiInstance.sendTransacEmail(notifyEmail);
    console.log(
      `✅ Contact notification sent to ${recipients.map((r) => r.email).join(
        ', '
      )} (Message ID: ${result.body?.messageId || 'N/A'})`
    );
    return result;
  } catch (error) {
    console.error(
      `❌ Error sending contact notification to admin ${adminEmail}:`,
      error.message || error
    );
    throw error;
  }
};

module.exports = {
  sendBookingConfirmation,
  sendAdminNotification,
  sendTokenCredentials,
  sendContactAcknowledgement,
  sendContactNotificationToAdmin
};

