const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware to authenticate admin users
 */
const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. Please provide a valid token.' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET || process.env.JWT_SECRET);
    
    // Find user by email (since token contains email)
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }

    // Attach user to request
    req.user = user;
    req.admin = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    console.error('Admin auth error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

module.exports = adminAuth;

