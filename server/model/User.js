const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    number: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        enum: ['admin', 'user']
    }
})

module.exports = mongoose.model('User', userSchema)