require('dotenv').config()
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all users. **Requires authentication via Bearer token in Authorization header.**
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Unauthorized - Missing or invalid Bearer token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication required
 */
userRouter.get('/', async (request, response) => {
  const user = await User.find({})

  response.json(user)
})

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Create a new user account. No authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: JWT token
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User already exist
 *       500:
 *         description: Server error
 */
userRouter.post('/register', async (request, response) => {
  const {email,password} = request.body

  try {
    const existingUser = await User.findOne({email})

    if(existingUser) {
      return response.status(400).json({msg: 'User already exist'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      email,
      password: passwordHash
    })

    await newUser.save()

    const userForToken = {
      email: email,
      password: password
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).json(token)
  }catch (err) {
    console.error(err)
    response.status(500).json({msg: 'Error registering new user'})
  }
})

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     description: Authenticate user and receive JWT token. No authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: JWT token (use this in Authorization header as "Bearer <token>")
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Email not found
 *       500:
 *         description: Server error
 */
userRouter.post('/login', async (request, response) => {
  const {email, password} = request.body

  try {
    const existingUser = await User.findOne({email})
    if (!existingUser) {
      return response.status(400).json({msg: 'Email not found'})
    }
    const correctPass = bcrypt.compare(password, existingUser.password)
    if (!correctPass) {
      return response.status(400).json({msg : 'Wrong password'})
    }

    const userForToken = {
      email: existingUser.email,
      password: existingUser.password
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).json(token)
  } catch (err) {
    console.log(err)
    response.status(500).json({msg: 'Error logging in user'})
  }
})

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     description: Send password reset email to user. No authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Password reset email send
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.post('/forgot-password', async (request,response) => {
  const {email} = request.body

  try {
    const user = await User.findOne({email})
    if (!user) {
      return response.status(400).json({msg: 'User not found'})
    }

    const resetToken = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn : '1hr'})

    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`

    const mailOption = {
      from : process.env.EMAIL,
      to : user.email,
      subject : 'Password reset request',
      text : `You requested for a password reset. Click on the link to reset your password, ${resetUrl}`
    }

    configs.transporter.sendMail(mailOption)

    response.status(200).json({msg: 'Password reset email send'})
  } catch(err) {
    console.log(err)
    response.status(500).json({ msg: 'password reset email failed to send'})
  }
})

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   post:
 *     summary: Reset password with token
 *     tags: [Users]
 *     description: Reset user password using the token from the reset email. No Bearer token authentication required (uses URL token).
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Password reset successfull
 *       400:
 *         description: Invalid token or validation error
 *       500:
 *         description: Server error
 */
userRouter.post('/reset-password/:token', async (request,response) => {
  const {password} = request.body
  const token = request.params

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const decodedId = decoded.id

    if(!password && password.length < 6) {
      return response.status(400).json({msg : 'Password must be more than 6 characters'})
    }

    const saltRounds = 10
    const passwordHash = bcrypt.hash(password, saltRounds)

    await User.findByIdAndUpdate(decodedId, {password: passwordHash})

    response.status(200).json({msg: 'Password reset successfull'})
  } catch (error) {
    console.error(error.message);
    //  token verification errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ msg: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ msg: 'Token has expired' });
    }
    res.status(500).send('Server error')
  }
})

module.exports = userRouter