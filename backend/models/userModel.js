const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    interests: {
        type: Array,
        required: false
    },
    myEvents: {
        type: Array,
        required: false
    },
}, { timestamps: true })

// static signup
userSchema.statics.signup = async function(email, password) {
    // data validation
    if (!email || !password) {
        throw Error('Email and password fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    //if (!validator.isStrongPassword(password)) { throw Error ('Password weak')}
    // email exists
    const alreadyExists = await this.findOne({ email })
    if (alreadyExists) {
        throw Error('Email already exists')
    }
    // hashing password
    const uniquify = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, uniquify)

    const userData = await this.create({ email, password: hash })
    
    return userData
}

module.exports = mongoose.model('User', userSchema)