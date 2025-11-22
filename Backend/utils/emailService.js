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

module.exports = {
  sendBookingConfirmation,
  sendAdminNotification
};

