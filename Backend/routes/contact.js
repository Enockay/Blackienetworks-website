const router = require('express').Router();
const {
  sendContactAcknowledgement,
  sendContactNotificationToAdmin,
} = require('../utils/emailService');

// Public contact form endpoint
router.post('/', async (req, res) => {
  const { fullName, company, email, phone, service, budget, message } = req.body;

  if (!fullName || !email || !phone || !service || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      required: ['fullName', 'email', 'phone', 'service', 'message'],
    });
  }

  const contactData = {
    fullName,
    company: company || '',
    email,
    phone,
    service,
    budget: budget || '',
    message,
  };

  try {
    await Promise.all([
      sendContactAcknowledgement(contactData),
      sendContactNotificationToAdmin(contactData),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

module.exports = router;

