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

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('Email and password must be filled out')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email doesn\'t exist in database')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}
// static signup
userSchema.statics.signup = async function(email, password, userName, fullName) {
    // data validation
    if (!email || !password || !userName || !fullName) {
        throw Error('Fields must be filled out')
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

    const userData = await this.create({ email, password: hash, userName, fullName })
    
    return userData
}


module.exports = mongoose.model('User', userSchema)