const app = require('./app');
const mongoose = require('mongoose');
const os = require('os');

const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || '0.0.0.0'; // Bind to all network interfaces

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // In production, you might want to exit the process
  // process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
let server;
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Helper function to get network IP addresses
function getNetworkIPs() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          interface: name,
          address: iface.address
        });
      }
    }
  }
  
  return addresses;
}

server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Environment: ${NODE_ENV}`);
  console.log(`🌐 Listening on: ${HOST}:${PORT}`);
  console.log(`\n📍 Accessible via:`);
  console.log(`   - Local:    http://localhost:${PORT}`);
  console.log(`   - Network:  http://127.0.0.1:${PORT}`);
  
  // Display network IP addresses
  const networkIPs = getNetworkIPs();
  if (networkIPs.length > 0) {
    console.log(`\n🌍 Network IP addresses:`);
    networkIPs.forEach(({ interface: name, address }) => {
      console.log(`   - ${name}: http://${address}:${PORT}`);
    });
  } else {
    console.log(`\n⚠️  No network interfaces found. Server only accessible via localhost.`);
  }
  
  console.log(`\n🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api-docs`);
});