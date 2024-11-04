require('dotenv').config()
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')

userRouter.get('/', async (request, response) => {
  const user = await User.find({})

  response.json(user)
})

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