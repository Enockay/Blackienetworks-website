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

/**
 * @swagger
 * /api/bookings/book/public:
 *   post:
 *     summary: Create a public booking (no authentication required)
 *     tags: [Bookings]
 *     description: Create a booking without authentication. Sends confirmation emails automatically.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - service
 *               - date
 *               - time
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               service:
 *                 type: string
 *                 example: Web Development
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-25"
 *               time:
 *                 type: string
 *                 example: "10:00"
 *               description:
 *                 type: string
 *                 example: Need a new website
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     booking:
 *                       $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation error or invalid date
 */
bookRouter.post('/book/public', validateBooking, handleValidationErrors, async (request, response) => {
    const { service, description, date, time, name, email, phone } = request.body

    try {
        if (!service || !date || !time || !name || !email || !phone) {
            return response.status(400).json({ 
                message: 'All required fields are missing',
                required: ['service', 'date', 'time', 'name', 'email', 'phone']
            })
        }

        // Combine date and time into scheduledDate
        const scheduledDate = new Date(`${date}T${time}`)

        // Validate date is in the future
        if (scheduledDate < new Date()) {
            return response.status(400).json({ message: 'Booking date must be in the future' })
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