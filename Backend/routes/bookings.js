const bookRouter = require('express').Router()
const Booking = require('../models/booking')

bookRouter.get('/', async (request,response) => {
    const bookings = await Booking.find({})

    response.status(200).json(bookings)
})

bookRouter.post('/book', async (request, response) => {
    const {userId,service, details, scheduledDate} = request.body

    try{
        if (!userId || !service || !details || !scheduledDate) {
            return res.status(400).json({ message: 'All fields are required' });
        } 

        const newBooking = new Booking({
            user : userId,
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