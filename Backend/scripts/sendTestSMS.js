require('dotenv').config();
const mongoose = require('mongoose');
const { sendSMS } = require('../utils/notificationService');
const Notification = require('../models/notification');

// Get phone number from command line argument or use default
const phoneNumber = process.argv[2] || '+254796869402';
const message = process.argv[3] || 'Hello! This is a test SMS from Blackie Networks Notification Server.';

// Ensure phone number is in E.164 format
const formatPhoneNumber = (phone) => {
  // Remove all spaces and dashes
  phone = phone.replace(/[\s-]/g, '');
  
  // If it doesn't start with +, add it
  if (!phone.startsWith('+')) {
    // If it starts with 0, replace with country code
    if (phone.startsWith('0')) {
      phone = '+254' + phone.substring(1);
    } else if (phone.startsWith('254')) {
      phone = '+' + phone;
    } else {
      // Assume Kenya number
      phone = '+254' + phone;
    }
  }
  
  return phone;
};

const sendTestSMS = async () => {
  try {
    // Connect to MongoDB
    const MONGODB = process.env.MONGODB;
    if (!MONGODB) {
      console.error('❌ MONGODB environment variable is not set');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB);
    console.log('✅ Connected to MongoDB');

    // Check if BREVO_API_KEY is set
    if (!process.env.BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY environment variable is not set');
      process.exit(1);
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log(`📱 Sending SMS to: ${formattedPhone}`);
    console.log(`💬 Message: ${message}`);

    // Create a dummy ObjectId for testing (required by schema)
    const dummyTokenId = new mongoose.Types.ObjectId();

    // Create notification record
    const notification = new Notification({
      accessTokenId: dummyTokenId, // Dummy token ID for testing
      channel: 'sms',
      recipient: formattedPhone,
      recipientName: 'Test User',
      message: message,
      status: 'pending'
    });

    await notification.save();

    // Send SMS
    console.log('📤 Sending SMS via Brevo...');
    const result = await sendSMS(notification);

    if (result.success) {
      console.log('✅ SMS sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Notification ID: ${notification._id}`);
      console.log(`   Status: ${notification.status}`);
    } else {
      console.error('❌ Failed to send SMS');
      console.error(`   Error: ${notification.errorMessage}`);
    }

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
    console.error('Full error:', error);
    
    // Try to close MongoDB connection
    try {
      await mongoose.connection.close();
    } catch (e) {
      // Ignore close errors
    }
    
    process.exit(1);
  }
};

// Run the script
sendTestSMS();
