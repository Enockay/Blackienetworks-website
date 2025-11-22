const mongoose = require('mongoose')
const User = require('./user')


const bookSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: false, // Made optional for non-authenticated bookings
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    service : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    scheduledDate: {
        type : Date,
        required: true
    },
    status : {
       type: String,
       enum : [
        'Pending', 'Confirmed', 'Completed', 'Cancelled' 
       ],
       default: 'Pending'
    }
})

bookSchema.set('toJSON', {
    transform: (document,requestedData) => {
        requestedData.id = requestedData._id.toString()

        delete requestedData._id
        delete requestedData.__v
    }
})

module.exports = mongoose.model('Booking', bookSchema)