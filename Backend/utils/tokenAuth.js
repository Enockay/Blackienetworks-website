const AccessToken = require('../models/accessToken');

/**
 * Middleware to authenticate requests using access tokens
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Access token is required. Please provide token in Authorization header.',
        details: {
          header: 'Authorization: Bearer <your-token>',
          example: 'Authorization: Bearer 12345678-1234-1234-1234-123456789abc'
        }
      });
    }

    // Extract token (support both "Bearer <token>" and just "<token>")
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token || token.trim() === '') {
      return res.status(401).json({
        success: false,
        error: 'INVALID_TOKEN',
        message: 'Access token is empty or invalid.',
        details: {
          format: 'Authorization: Bearer <your-token>'
        }
      });
    }

    // Find token in database
    const accessToken = await AccessToken.findOne({ token: token.trim() });

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_TOKEN',
        message: 'Access token not found or invalid.',
        details: {
          hint: 'Please check your token or contact administrator to generate a new one.'
        }
      });
    }

    // Check if token is valid
    if (!accessToken.isValid()) {
      return res.status(401).json({
        success: false,
        error: 'TOKEN_EXPIRED_OR_INACTIVE',
        message: accessToken.expiresAt && accessToken.expiresAt < new Date()
          ? 'Access token has expired.'
          : 'Access token is inactive.',
        details: {
          hint: 'Please contact administrator to generate a new token.'
        }
      });
    }

    // Check rate limit (simple implementation)
    // You can enhance this with Redis for distributed systems
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (accessToken.lastUsed && accessToken.lastUsed > oneHourAgo) {
      // Reset usage count if last used more than an hour ago
      if (accessToken.usageCount >= accessToken.rateLimit) {
        return res.status(429).json({
          success: false,
          error: 'RATE_LIMIT_EXCEEDED',
          message: `Rate limit exceeded. Maximum ${accessToken.rateLimit} requests per hour.`,
          details: {
            limit: accessToken.rateLimit,
            resetAt: new Date(accessToken.lastUsed.getTime() + 60 * 60 * 1000).toISOString()
          }
        });
      }
    } else {
      // Reset count if more than an hour has passed
      accessToken.usageCount = 0;
    }

    // Record usage (async, don't wait)
    accessToken.recordUsage().catch(err => {
      console.error('Error recording token usage:', err);
    });

    // Attach token info to request
    req.accessToken = accessToken;
    req.tokenId = accessToken._id;

    next();
  } catch (error) {
    console.error('Token authentication error:', error);
    return res.status(500).json({
      success: false,
      error: 'AUTHENTICATION_ERROR',
      message: 'An error occurred during authentication.',
      details: {
        hint: 'Please try again later or contact support.'
      }
    });
  }
};

/**
 * Middleware to check if token has permission for specific channel
 */
const checkChannelPermission = (channel) => {
  return (req, res, next) => {
    if (!req.accessToken) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication required.'
      });
    }

    if (!req.accessToken.allowedChannels.includes(channel.toLowerCase())) {
      return res.status(403).json({
        success: false,
        error: 'CHANNEL_NOT_ALLOWED',
        message: `Your access token does not have permission to send ${channel} notifications.`,
        details: {
          allowedChannels: req.accessToken.allowedChannels,
          requestedChannel: channel
        }
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  checkChannelPermission
};

