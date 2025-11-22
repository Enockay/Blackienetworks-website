/**
 * Validates required environment variables
 * Throws error if any required variables are missing
 */
const validateEnv = () => {
  const required = [
    'MONGODB',
    'PORT',
    'JWT_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file.'
    );
  }

  // Warn about optional but recommended variables
  const recommended = ['BREVO_API_KEY', 'BREVO_SENDER_EMAIL', 'ADMIN_EMAIL'];
  const missingRecommended = recommended.filter(key => !process.env[key]);
  
  if (missingRecommended.length > 0) {
    console.warn(
      `⚠️  Warning: Optional environment variables not set: ${missingRecommended.join(', ')}\n` +
      'Email functionality may not work properly.'
    );
  }

  console.log('✅ Environment variables validated');
};

module.exports = { validateEnv };

