const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const user = await User.find({})

  response.json(user)
})

module.exports = userRouter