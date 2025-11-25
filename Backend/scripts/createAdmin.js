require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Get email and password from command line arguments or use defaults
const email = process.argv[2] || 'admin@blackie-networks.com';
const password = process.argv[3] || 'admin123';

async function createAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB = process.env.MONGODB;
    if (!MONGODB) {
      console.error('❌ MONGODB environment variable is not set');
      process.exit(1);
    }

    await mongoose.connect(MONGODB);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      console.log(`⚠️  Admin user with email ${email} already exists`);
      console.log('   You can use this account to login, or delete it first to create a new one.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const adminUser = new User({
      email,
      password: passwordHash,
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔐 You can now login at: http://localhost:5173/login');
    console.log('   (or your frontend URL)');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    if (error.code === 11000) {
      console.error('   A user with this email already exists (but may not be an admin)');
    }
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the script
createAdmin();

