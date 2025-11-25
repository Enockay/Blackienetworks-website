const bookRouter = require('express').Router()
const Booking = require('../models/booking')
const User = require('../models/user')
const authenticator = require('../utils/middleware')
const { sendBookingConfirmation, sendAdminNotification } = require('../utils/emailService')

bookRouter.get('/', async (request, response) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').sort({ bookingDate: -1 })
        response.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        })
    } catch (error) {
        console.error('Error fetching bookings:', error)
        response.status(500).json({ 
            success: false,
            message: 'Error fetching bookings' 
        })
    }
})

// Route for authenticated bookings (optional - can be used if user is logged in)
bookRouter.post('/book', authenticator, async (request, response) => {
    const { service, description, date, time, name, email, phone } = request.body

    try {
        const userId = request.user.id
        const user = await User.findById(userId)

        if (!user) {
            return response.status(400).json({ msg: 'User not found' })
        }

        if (!service || !date || !time || !name || !email || !phone) {
            return response.status(400).json({ message: 'All required fields are missing' })
        }

        // Combine date and time into scheduledDate
        const scheduledDate = new Date(`${date}T${time}`)

        const newBooking = new Booking({
            user: user.id,
            name,
            email,
            phone,
            service,
            description: description || '',
            date: new Date(date),
            time,
            scheduledDate
        })

        const savedBooking = await newBooking.save()

        // Send confirmation email to user
        try {
            await sendBookingConfirmation({
                name,
                email,
                service,
                date,
                time,
                description
            })

            // Send notification to admin
            await sendAdminNotification({
                name,
                email,
                phone,
                service,
                date,
                time,
                description
            })
        } catch (emailError) {
            console.error('Error sending emails:', emailError)
            // Don't fail the booking if email fails
        }

        response.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: savedBooking
        })
    } catch (err) {
        console.error('Error creating booking:', err)
        response.status(500).json({ 
            success: false,
            message: 'Error booking service' 
        })
    }
})

// Route for non-authenticated bookings (public booking form)
const { validateBooking, handleValidationErrors } = require('../utils/validation');

// Public booking endpoint - no authentication required
bookRouter.post('/book/public', validateBooking, handleValidationErrors, async (request, response) => {
    const { service, description, date, time, name, email, phone } = request.body

    try {
        if (!service || !date || !time || !name || !email || !phone) {
            return response.status(400).json({ 
                success: false,
                message: 'All required fields are missing',
                required: ['service', 'date', 'time', 'name', 'email', 'phone']
            })
        }

        // Combine date and time into scheduledDate
        const scheduledDate = new Date(`${date}T${time}`)

        // Validate date is in the future
        if (scheduledDate < new Date()) {
            return response.status(400).json({ 
                success: false,
                message: 'Booking date must be in the future' 
            })
        }

        const newBooking = new Booking({
            name,
            email,
            phone,
            service,
            description: description || '',
            date: new Date(date),
            time,
            scheduledDate
        })

        const savedBooking = await newBooking.save()

        // Send confirmation email to user
        try {
            await sendBookingConfirmation({
                name,
                email,
                service,
                date,
                time,
                description
            })

            // Send notification to admin
            await sendAdminNotification({
                name,
                email,
                phone,
                service,
                date,
                time,
                description
            })
        } catch (emailError) {
            console.error('Error sending emails:', emailError)
            // Don't fail the booking if email fails
        }

        response.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: savedBooking
        })
    } catch (err) {
        console.error('Error creating booking:', err)
        response.status(500).json({ 
            success: false,
            message: 'Error booking service' 
        })
    }
})

module.exports = bookRouter