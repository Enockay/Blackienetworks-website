const bookRouter = require('express').Router()
const Booking = require('../models/booking')
const User = require('../models/user')
const authenticator = require('../utils/middleware')

bookRouter.get('/', async (request,response) => {
    const bookings = await Booking.find({})

    response.status(200).json(bookings)
})

bookRouter.post('/book', authenticator, async (request, response) => {
    const {service, details, scheduledDate} = request.body

    try{
        const userId = request.user.id
        const user = await User.findById(userId)

        if(!user) {
            return response.status(400).json({msg: 'User not found'})
        }
        if (!service || !details || !scheduledDate) {
            return res.status(400).json({ message: 'All fields are required' });
        } 

        const newBooking = new Booking({
            user : user.id,
            service,
            details,
            scheduledDate
        })

        const savedBooking = await newBooking.save()

        response.status(200).json({
            message: 'Booking created succssfully',
            Booking: savedBooking
        })
    } catch(err) {
        consle.log(err)
        response.status(500).json({message: 'Error booking service'})
    }
})
module.exports = bookRouter