const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : String,
    password: String
})

userSchema.set('toJSON', {
    transform : (document, requestData) => {
        requestData.id = requestData._id.toString()
        
        delete requestData._id
        delete requestData.__v
    }
})

module.exports= mongoose.model('User', userSchema)