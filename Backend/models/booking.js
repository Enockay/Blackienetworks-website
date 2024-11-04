const mongoose = require('mongoose')
const User = require('./user')


const bookSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    }, 
    services : {
        type: String,
        enum : [
            'Software Development',
            'Network Setup and Infrastructure',
            'IT Consulting',
            'Training and Support',
        ],
        required: true
    },
    details : {
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