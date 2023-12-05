const express = require('express')
const route  = express.Router()

// controller functions
const { loginUser, signupUser, getUsers, getLeaderboard } = require('../controllers/userController')

// login route
route.post('/login', loginUser)

// signup route
route.post('/signup', signupUser)

// get all the Events route
route.get('/getUsers', getUsers)

route.get('/getLeaderboard', getLeaderboard)
module.exports = route