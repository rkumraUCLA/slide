const express = require('express')
const route  = express.Router()

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

// login route
route.post('/login', loginUser)

// signup route
route.post('/signup', signupUser)

module.exports = route