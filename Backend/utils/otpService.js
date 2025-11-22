const { sendNotification } = require('./notificationService');
const crypto = require('crypto');

// In-memory OTP storage (in production, use Redis or database)
const otpStore = new Map();
const cleanupTimers = new Map(); // Store cleanup timers for testing

/**
 * Generate a random OTP code
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} - Generated OTP code
 */
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

/**
 * Store OTP with expiration
 * @param {string} identifier - Email or phone number
 * @param {string} otp - OTP code
 * @param {number} expiresInMinutes - Expiration time in minutes (default: 10)
 */
const storeOTP = (identifier, otp, expiresInMinutes = 10) => {
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  otpStore.set(identifier, {
    otp,
    expiresAt,
    attempts: 0,
    maxAttempts: 5
  });
  
  // Clear any existing cleanup timer for this identifier
  if (cleanupTimers.has(identifier)) {
    clearTimeout(cleanupTimers.get(identifier));
  }
  
  // Clean up expired OTPs
  const timer = setTimeout(() => {
    if (otpStore.has(identifier)) {
      const stored = otpStore.get(identifier);
      if (stored.expiresAt < new Date()) {
        otpStore.delete(identifier);
        cleanupTimers.delete(identifier);
      }
    }
  }, expiresInMinutes * 60 * 1000);
  
  cleanupTimers.set(identifier, timer);
};

/**
 * Verify OTP code
 * @param {string} identifier - Email or phone number
 * @param {string} otp - OTP code to verify
 * @returns {Object} - Verification result
 */
const verifyOTP = (identifier, otp) => {
  const stored = otpStore.get(identifier);
  
  if (!stored) {
    return {
      valid: false,
      error: 'OTP_NOT_FOUND',
      message: 'OTP not found or expired'
    };
  }
  
  if (stored.expiresAt < new Date()) {
    otpStore.delete(identifier);
    return {
      valid: false,
      error: 'OTP_EXPIRED',
      message: 'OTP has expired'
    };
  }
  
  if (stored.attempts >= stored.maxAttempts) {
    otpStore.delete(identifier);
    return {
      valid: false,
      error: 'MAX_ATTEMPTS_EXCEEDED',
      message: 'Maximum verification attempts exceeded'
    };
  }
  
  stored.attempts += 1;
  
  if (stored.otp !== otp) {
    return {
      valid: false,
      error: 'INVALID_OTP',
      message: 'Invalid OTP code',
      attemptsRemaining: stored.maxAttempts - stored.attempts
    };
  }
  
  // OTP is valid, remove it
  otpStore.delete(identifier);
  
  return {
    valid: true,
    message: 'OTP verified successfully'
  };
};

/**
 * Send OTP via email
 * @param {string} accessTokenId - Access token ID
 * @param {string} email - Recipient email
 * @param {string} recipientName - Recipient name (optional)
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Result with OTP code and notification details
 */
const sendOTPViaEmail = async (accessTokenId, email, recipientName = null, options = {}) => {
  try {
    const otp = generateOTP(options.otpLength || 6);
    const expiresInMinutes = options.expiresInMinutes || 10;
    
    // Store OTP
    storeOTP(email, otp, expiresInMinutes);
    
    // Create email message
    const subject = options.subject || 'Your OTP Code - Blackie Networks';
    const message = `
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
          .otp-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            border: 2px dashed #00f0ff;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #0066ff;
            letter-spacing: 5px;
            font-family: 'Courier New', monospace;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Your OTP Code</h1>
          </div>
          <div>
            <p>Hello ${recipientName || 'there'},</p>
            <p>You requested an OTP code. Please use the code below to verify your identity:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This code will expire in ${expiresInMinutes} minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this code, please ignore this email</li>
              </ul>
            </div>
            
            <p>Best regards,<br>
            <strong>Blackie Networks Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send via notification service
    const result = await sendNotification(accessTokenId, 'email', email, {
      recipientName,
      subject,
      message,
      metadata: {
        type: 'otp',
        expiresInMinutes
      }
    });
    
    return {
      success: true,
      otp: otp, // Only return in development/testing
      expiresInMinutes,
      notificationId: result.notificationId,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    throw error;
  }
};

/**
 * Send OTP via SMS
 * @param {string} accessTokenId - Access token ID
 * @param {string} phoneNumber - Recipient phone number (E.164 format)
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Result with OTP code and notification details
 */
const sendOTPViaSMS = async (accessTokenId, phoneNumber, options = {}) => {
  try {
    const otp = generateOTP(options.otpLength || 6);
    const expiresInMinutes = options.expiresInMinutes || 10;
    
    // Store OTP
    storeOTP(phoneNumber, otp, expiresInMinutes);
    
    // Create SMS message
    const message = options.message || 
      `Your Blackie Networks OTP code is: ${otp}. Valid for ${expiresInMinutes} minutes. Do not share this code.`;
    
    // Send via notification service
    const result = await sendNotification(accessTokenId, 'sms', phoneNumber, {
      message,
      metadata: {
        type: 'otp',
        expiresInMinutes
      }
    });
    
    return {
      success: true,
      otp: otp, // Only return in development/testing
      expiresInMinutes,
      notificationId: result.notificationId,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Error sending OTP via SMS:', error);
    throw error;
  }
};

/**
 * Send OTP via both email and SMS
 * @param {string} accessTokenId - Access token ID
 * @param {string} email - Recipient email
 * @param {string} phoneNumber - Recipient phone number (E.164 format)
 * @param {string} recipientName - Recipient name (optional)
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Result with OTP code and notification details
 */
const sendOTPViaBoth = async (accessTokenId, email, phoneNumber, recipientName = null, options = {}) => {
  try {
    const otp = generateOTP(options.otpLength || 6);
    const expiresInMinutes = options.expiresInMinutes || 10;
    
    // Store OTP for both identifiers
    storeOTP(email, otp, expiresInMinutes);
    storeOTP(phoneNumber, otp, expiresInMinutes);
    
    // Create email message
    const emailSubject = options.subject || 'Your OTP Code - Blackie Networks';
    const emailMessage = `
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
          .otp-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            border: 2px dashed #00f0ff;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #0066ff;
            letter-spacing: 5px;
            font-family: 'Courier New', monospace;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Your OTP Code</h1>
          </div>
          <div>
            <p>Hello ${recipientName || 'there'},</p>
            <p>You requested an OTP code. Please use the code below to verify your identity:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This code will expire in ${expiresInMinutes} minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this code, please ignore this email</li>
              </ul>
            </div>
            
            <p>Best regards,<br>
            <strong>Blackie Networks Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Create SMS message
    const smsMessage = options.message || 
      `Your Blackie Networks OTP code is: ${otp}. Valid for ${expiresInMinutes} minutes. Do not share this code.`;
    
    // Send via both channels
    const [emailResult, smsResult] = await Promise.all([
      sendNotification(accessTokenId, 'email', email, {
        recipientName,
        subject: emailSubject,
        message: emailMessage,
        metadata: {
          type: 'otp',
          expiresInMinutes
        }
      }),
      sendNotification(accessTokenId, 'sms', phoneNumber, {
        message: smsMessage,
        metadata: {
          type: 'otp',
          expiresInMinutes
        }
      })
    ]);
    
    return {
      success: true,
      otp: otp, // Only return in development/testing
      expiresInMinutes,
      email: {
        notificationId: emailResult.notificationId,
        messageId: emailResult.messageId
      },
      sms: {
        notificationId: smsResult.notificationId,
        messageId: smsResult.messageId
      }
    };
  } catch (error) {
    console.error('Error sending OTP via both channels:', error);
    throw error;
  }
};

/**
 * Clear OTP for an identifier
 * @param {string} identifier - Email or phone number
 */
const clearOTP = (identifier) => {
  otpStore.delete(identifier);
  if (cleanupTimers.has(identifier)) {
    clearTimeout(cleanupTimers.get(identifier));
    cleanupTimers.delete(identifier);
  }
};

/**
 * Get OTP info (for testing/debugging)
 * @param {string} identifier - Email or phone number
 * @returns {Object|null} - OTP info or null
 */
const getOTPInfo = (identifier) => {
  const stored = otpStore.get(identifier);
  if (!stored) return null;
  
  return {
    expiresAt: stored.expiresAt,
    attempts: stored.attempts,
    maxAttempts: stored.maxAttempts,
    isExpired: stored.expiresAt < new Date()
  };
};

/**
 * Clear all OTPs and timers (for testing)
 */
const clearAllOTPs = () => {
  // Clear all timers
  cleanupTimers.forEach(timer => clearTimeout(timer));
  cleanupTimers.clear();
  otpStore.clear();
};

/**
 * Get OTP store (for testing only)
 * @returns {Map} - The OTP store
 */
const getOTPStore = () => otpStore;

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  sendOTPViaEmail,
  sendOTPViaSMS,
  sendOTPViaBoth,
  clearOTP,
  getOTPInfo,
  clearAllOTPs,
  getOTPStore // For testing only
};

