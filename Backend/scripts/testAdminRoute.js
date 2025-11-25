require('dotenv').config();
const app = require('../app');

// Test if admin routes are registered
const routes = [];
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    routes.push({
      path: middleware.route.path,
      methods: Object.keys(middleware.route.methods)
    });
  } else if (middleware.name === 'router') {
    // This is a router middleware
    if (middleware.regexp.source.includes('admin')) {
      console.log('✅ Admin router found');
      console.log('   Path pattern:', middleware.regexp.source);
    }
  }
});

console.log('\n📋 Testing admin login route...\n');

// Test the route
const testRoute = async () => {
  const http = require('http');
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3002';
  
  const testData = JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  });

  const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/api/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Status: ${res.statusCode === 404 ? '❌ Route not found (404)' : res.statusCode === 401 ? '✅ Route found (401 - expected for invalid credentials)' : '✅ Route found'}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        console.log('Response:', parsed.message || parsed.msg || 'No message');
      } catch (e) {
        console.log('Response:', data.substring(0, 100));
      }
      process.exit(res.statusCode === 404 ? 1 : 0);
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
    console.log('\n💡 Make sure the server is running on port 3002');
    process.exit(1);
  });

  req.write(testData);
  req.end();
};

// Wait a bit for server to be ready if needed
setTimeout(testRoute, 1000);

