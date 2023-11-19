const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    interests: {
        type: Array,
        required: false
    },
    schoolYear: {
        type: Number,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)