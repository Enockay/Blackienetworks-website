// Jest setup file - runs before all tests
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Set test environment variables if not already set
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Mock console warnings for cleaner test output
const originalWarn = console.warn;
console.warn = (...args) => {
  // Suppress BREVO_API_KEY warning in tests
  if (args[0] && typeof args[0] === 'string' && args[0].includes('BREVO_API_KEY')) {
    return;
  }
  originalWarn(...args);
};

// uuid v9 supports CommonJS, no mocking needed

