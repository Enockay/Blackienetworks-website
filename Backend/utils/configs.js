const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: process.env.EMAIL,
        pass: process.env['EMAIL-PASSWORD'] || process.env.EMAIL_PASSWORD
    }
})


module.exports = {
    transporter
}