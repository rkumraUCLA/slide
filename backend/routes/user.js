const express = require('express')
const route  = express.Router()

// controller functions
const { loginUser, signupUser, getUsers, updateUser, addEvent, getLeaderboard } = require('../controllers/userController')

// login route
route.post('/login', loginUser)

// signup route
route.post('/signup', signupUser)

// get all the users route
route.get('/getUsers', getUsers)

route.get('/getLeaderboard', getLeaderboard)

// update user information
route.patch('/updateUser', updateUser)

// addevents
route.patch('/:id/addEvent', addEvent)

route.get('/getUserEvents/:id', getUserEvents)
module.exports = route