const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Middleware to authenticate users via JWT token
const authenticator = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return response.status(401).json({ message: 'Authentication required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return response.status(401).json({ message: 'User not found' })
    }

    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authenticator

