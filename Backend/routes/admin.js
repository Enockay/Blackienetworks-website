const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const adminAuth = require('../utils/adminAuth');
const AccessToken = require('../models/accessToken');
const IPBlacklist = require('../models/ipBlacklist');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendTokenCredentials } = require('../utils/emailService');

/**
 * Admin Signup (Development Only)
 * POST /api/admin/signup
 * Note: This endpoint is only available in development mode for testing purposes
 */
router.post('/signup', async (req, res) => {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      success: false,
      message: 'Admin signup is disabled in production. Use the createAdmin script instead.'
    });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
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

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        email: adminUser.email,
        role: adminUser.role,
        id: adminUser._id.toString()
      },
      note: 'You can now login at /api/admin/login'
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating admin user'
    });
  }
});

/**
 * Admin Login
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // Verify password
    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const userForToken = {
      email: user.email,
      id: user._id.toString()
    };

    const token = jwt.sign(userForToken, process.env.SECRET || process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error logging in'
    });
  }
});

/**
 * Get admin dashboard stats
 * GET /api/admin/dashboard/stats
 */
router.get('/dashboard/stats', adminAuth, async (req, res) => {
  try {
    const totalTokens = await AccessToken.countDocuments();
    const activeTokens = await AccessToken.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments();
    const totalBlacklistedIPs = await IPBlacklist.countDocuments({ isActive: true });

    // Get recent tokens
    const recentTokens = await AccessToken.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name description isActive createdAt usageCount')
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalTokens,
          activeTokens,
          inactiveTokens: totalTokens - activeTokens,
          totalUsers,
          totalBlacklistedIPs
        },
        recentTokens
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
});

/**
 * Generate access token for user
 * POST /api/admin/tokens/generate
 */
router.post('/tokens/generate', 
  adminAuth,
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    body('allowedChannels')
      .optional()
      .isArray()
      .withMessage('allowedChannels must be an array'),
    body('allowedChannels.*')
      .isIn(['email', 'sms', 'push', 'whatsapp'])
      .withMessage('Each channel must be one of: email, sms, push, whatsapp'),
    body('rateLimit')
      .optional()
      .isInt({ min: 1, max: 10000 })
      .withMessage('rateLimit must be between 1 and 10000'),
    body('expiresAt')
      .optional()
      .isISO8601()
      .withMessage('expiresAt must be a valid ISO 8601 date'),
    body('userEmail')
      .optional()
      .isEmail()
      .withMessage('userEmail must be a valid email')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        });
      }

      const {
        name,
        description,
        allowedChannels = ['email', 'sms'],
        rateLimit = 1000,
        expiresAt,
        metadata = {},
        userEmail,
        assignedServers = [],
        maxServers = 5
      } = req.body;

      // If userEmail is provided, add it to metadata
      if (userEmail) {
        metadata.userEmail = userEmail;
      }

      // Validate maxServers
      const validMaxServers = Math.min(Math.max(parseInt(maxServers) || 5, 1), 5);
      
      // Validate assigned servers
      if (assignedServers && Array.isArray(assignedServers) && assignedServers.length > validMaxServers) {
        return res.status(400).json({
          success: false,
          message: `Cannot assign more than ${validMaxServers} servers to a token`
        });
      }

      const accessToken = new AccessToken({
        name,
        description,
        allowedChannels,
        rateLimit,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        metadata,
        createdBy: req.user.email || 'admin',
        maxServers: validMaxServers,
        assignedServers: assignedServers.map(server => ({
          serverName: server.serverName || server.serverId || 'Unnamed Server',
          serverId: server.serverId || server.serverName || `server-${Date.now()}`,
          serverIP: server.serverIP || '',
          description: server.description || '',
          assignedAt: new Date(),
          lastUsed: null,
          usageCount: 0
        }))
      });

      const savedToken = await accessToken.save();

      // Send email to user if userEmail is provided
      if (userEmail) {
        try {
          // Extract name from email (username part before @)
          const userName = userEmail.split('@')[0];
          
          await sendTokenCredentials({
            userEmail,
            userName: userName,
            token: savedToken.token,
            tokenName: savedToken.name,
            description: savedToken.description,
            allowedChannels: savedToken.allowedChannels,
            rateLimit: savedToken.rateLimit,
            expiresAt: savedToken.expiresAt,
            assignedServers: savedToken.assignedServers,
            maxServers: savedToken.maxServers
          });
          console.log(`✅ Token credentials email sent to ${userEmail}`);
        } catch (emailError) {
          // Log error but don't fail the token creation
          console.error(`❌ Failed to send token credentials email to ${userEmail}:`, emailError.message || emailError);
        }
      }

      return res.status(201).json({
        success: true,
        message: 'Access token created successfully',
        data: {
          token: savedToken.token,
          id: savedToken._id.toString(),
          name: savedToken.name,
          description: savedToken.description,
          allowedChannels: savedToken.allowedChannels,
          rateLimit: savedToken.rateLimit,
          expiresAt: savedToken.expiresAt,
          createdAt: savedToken.createdAt,
          userEmail: userEmail || null,
          emailSent: !!userEmail,
          warning: '⚠️ Save this token now. You will not be able to see it again!'
        }
      });
    } catch (error) {
      console.error('Error creating access token:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while creating access token'
      });
    }
  }
);

/**
 * Get all tokens (admin view)
 * GET /api/admin/tokens
 */
router.get('/tokens', adminAuth, async (req, res) => {
  try {
    const tokens = await AccessToken.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: 'Access tokens retrieved successfully',
      data: {
        tokens: tokens.map(token => ({
          id: token._id.toString(),
          token: token.token, // Admin can see full token
          name: token.name,
          description: token.description,
          isActive: token.isActive,
          allowedChannels: token.allowedChannels,
          rateLimit: token.rateLimit,
          usageCount: token.usageCount,
          lastUsed: token.lastUsed,
          expiresAt: token.expiresAt,
          createdAt: token.createdAt,
          metadata: token.metadata,
          assignedServers: token.assignedServers || [],
          maxServers: token.maxServers || 5,
          serverCount: (token.assignedServers || []).length
        })),
        total: tokens.length
      }
    });
  } catch (error) {
    console.error('Error fetching access tokens:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while fetching access tokens'
    });
  }
});

/**
 * Disable/Enable access token
 * PUT /api/admin/tokens/:id/disable
 */
router.put('/tokens/:id/disable', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean value'
      });
    }

    const token = await AccessToken.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Access token not found'
      });
    }

    token.isActive = isActive;
    await token.save();

    return res.status(200).json({
      success: true,
      message: `Access token ${isActive ? 'enabled' : 'disabled'} successfully`,
      data: {
        id: token._id.toString(),
        isActive: token.isActive
      }
    });
  } catch (error) {
    console.error('Error updating token status:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while updating token status'
    });
  }
});

/**
 * Delete access token
 * DELETE /api/admin/tokens/:id
 */
router.delete('/tokens/:id', adminAuth, async (req, res) => {
  try {
    const token = await AccessToken.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Access token not found'
      });
    }

    await token.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Access token deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting access token:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while deleting access token'
    });
  }
});

/**
 * Get all blacklisted IPs
 * GET /api/admin/ip-blacklist
 */
router.get('/ip-blacklist', adminAuth, async (req, res) => {
  try {
    const blacklistedIPs = await IPBlacklist.find({})
      .populate('tokenId', 'name token')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: 'Blacklisted IPs retrieved successfully',
      data: {
        ips: blacklistedIPs.map(ip => ({
          id: ip._id.toString(),
          ip: ip.ip,
          tokenId: ip.tokenId?._id?.toString(),
          tokenName: ip.tokenId?.name,
          reason: ip.reason,
          blockedBy: ip.blockedBy,
          isActive: ip.isActive,
          createdAt: ip.createdAt,
          updatedAt: ip.updatedAt
        })),
        total: blacklistedIPs.length
      }
    });
  } catch (error) {
    console.error('Error fetching blacklisted IPs:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while fetching blacklisted IPs'
    });
  }
});

/**
 * Blacklist an IP for a token
 * POST /api/admin/ip-blacklist
 */
router.post('/ip-blacklist',
  adminAuth,
  [
    body('ip')
      .notEmpty()
      .withMessage('IP address is required')
      .matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      .withMessage('Invalid IP address format'),
    body('tokenId')
      .notEmpty()
      .withMessage('Token ID is required')
      .isMongoId()
      .withMessage('Invalid token ID format'),
    body('reason')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Reason must not exceed 500 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        });
      }

      const { ip, tokenId, reason } = req.body;

      // Verify token exists
      const token = await AccessToken.findById(tokenId);
      if (!token) {
        return res.status(404).json({
          success: false,
          message: 'Token not found'
        });
      }

      // Check if IP is already blacklisted for this token
      const existing = await IPBlacklist.findOne({ ip, tokenId });
      if (existing) {
        if (!existing.isActive) {
          // Reactivate existing blacklist
          existing.isActive = true;
          existing.reason = reason || existing.reason;
          existing.blockedBy = req.user.email || 'admin';
          await existing.save();
          
          return res.status(200).json({
            success: true,
            message: 'IP blacklist reactivated',
            data: {
              id: existing._id.toString(),
              ip: existing.ip,
              tokenId: existing.tokenId.toString(),
              isActive: existing.isActive
            }
          });
        }
        return res.status(400).json({
          success: false,
          message: 'IP is already blacklisted for this token'
        });
      }

      const ipBlacklist = new IPBlacklist({
        ip,
        tokenId,
        reason: reason || 'Blocked by administrator',
        blockedBy: req.user.email || 'admin',
        isActive: true
      });

      const saved = await ipBlacklist.save();

      return res.status(201).json({
        success: true,
        message: 'IP blacklisted successfully',
        data: {
          id: saved._id.toString(),
          ip: saved.ip,
          tokenId: saved.tokenId.toString(),
          reason: saved.reason,
          isActive: saved.isActive
        }
      });
    } catch (error) {
      console.error('Error blacklisting IP:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An error occurred while blacklisting IP'
      });
    }
  }
);

/**
 * Remove IP from blacklist
 * DELETE /api/admin/ip-blacklist/:id
 */
router.delete('/ip-blacklist/:id', adminAuth, async (req, res) => {
  try {
    const blacklist = await IPBlacklist.findById(req.params.id);

    if (!blacklist) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Blacklist entry not found'
      });
    }

    await blacklist.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'IP removed from blacklist successfully'
    });
  } catch (error) {
    console.error('Error removing IP from blacklist:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while removing IP from blacklist'
    });
  }
});

/**
 * Toggle IP blacklist status
 * PUT /api/admin/ip-blacklist/:id/toggle
 */
router.put('/ip-blacklist/:id/toggle', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean value'
      });
    }

    const blacklist = await IPBlacklist.findById(req.params.id);

    if (!blacklist) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Blacklist entry not found'
      });
    }

    blacklist.isActive = isActive;
    await blacklist.save();

    return res.status(200).json({
      success: true,
      message: `IP blacklist ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        id: blacklist._id.toString(),
        isActive: blacklist.isActive
      }
    });
  } catch (error) {
    console.error('Error toggling IP blacklist:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while toggling IP blacklist'
    });
  }
});

/**
 * Assign server to access token
 * POST /api/admin/tokens/:id/servers
 */
router.post('/tokens/:id/servers',
  adminAuth,
  [
    body('serverId')
      .notEmpty()
      .withMessage('Server ID is required')
      .isLength({ min: 1, max: 100 })
      .withMessage('Server ID must be between 1 and 100 characters'),
    body('serverName')
      .notEmpty()
      .withMessage('Server name is required')
      .isLength({ min: 1, max: 100 })
      .withMessage('Server name must be between 1 and 100 characters'),
    body('serverIP')
      .optional()
      .matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      .withMessage('Invalid IP address format'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        });
      }

      const token = await AccessToken.findById(req.params.id);
      if (!token) {
        return res.status(404).json({
          success: false,
          message: 'Token not found'
        });
      }

      const { serverId, serverName, serverIP, description } = req.body;

      // Check if server limit is reached
      if (token.assignedServers.length >= token.maxServers) {
        return res.status(400).json({
          success: false,
          message: `Maximum server limit (${token.maxServers}) reached for this token. Remove a server first or increase the limit.`
        });
      }

      await token.assignServer({
        serverId,
        serverName,
        serverIP,
        description
      });

      return res.status(200).json({
        success: true,
        message: 'Server assigned successfully',
        data: {
          tokenId: token._id.toString(),
          assignedServers: token.assignedServers,
          serverCount: token.assignedServers.length,
          maxServers: token.maxServers
        }
      });
    } catch (error) {
      console.error('Error assigning server:', error);
      return res.status(500).json({
        success: false,
        error: 'INTERNAL_ERROR',
        message: error.message || 'An error occurred while assigning server'
      });
    }
  }
);

/**
 * Remove server from access token
 * DELETE /api/admin/tokens/:id/servers/:serverId
 */
router.delete('/tokens/:id/servers/:serverId', adminAuth, async (req, res) => {
  try {
    const token = await AccessToken.findById(req.params.id);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }

    const { serverId } = req.params;
    const server = token.assignedServers.find(s => s.serverId === serverId);
    
    if (!server) {
      return res.status(404).json({
        success: false,
        message: 'Server not found in token assignments'
      });
    }

    await token.removeServer(serverId);

    return res.status(200).json({
      success: true,
      message: 'Server removed successfully',
      data: {
        tokenId: token._id.toString(),
        assignedServers: token.assignedServers,
        serverCount: token.assignedServers.length
      }
    });
  } catch (error) {
    console.error('Error removing server:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while removing server'
    });
  }
});

/**
 * Get servers assigned to a token
 * GET /api/admin/tokens/:id/servers
 */
router.get('/tokens/:id/servers', adminAuth, async (req, res) => {
  try {
    const token = await AccessToken.findById(req.params.id);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        tokenId: token._id.toString(),
        tokenName: token.name,
        assignedServers: token.assignedServers || [],
        serverCount: (token.assignedServers || []).length,
        maxServers: token.maxServers || 5
      }
    });
  } catch (error) {
    console.error('Error fetching token servers:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'An error occurred while fetching token servers'
    });
  }
});

module.exports = router;

