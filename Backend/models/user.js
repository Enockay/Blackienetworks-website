const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

userSchema.set('toJSON', {
    transform : (document, requestData) => {
        requestData.id = requestData._id.toString()
        
        delete requestData._id
        delete requestData.__v
    }
})

module.exports= mongoose.model('User', userSchema)