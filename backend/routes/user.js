const express = require('express')
const route  = express.Router()

// controller functions
const { loginUser, signupUser, getUsers, updateUser, addEvent, getLeaderboard , getUserEvents, getAllUsers, getUserById, updateProfile, removeEvent} = require('../controllers/userController')

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
route.patch('/addEvent/:id', addEvent)

// addevents
route.patch('/removeEvent/:id', removeEvent)

route.get('/getUserEvents/:id', getUserEvents)

route.get('/getAllUsers', getAllUsers)

route.get('/getUserByID/:id', getUserById)

route.patch('/updateProfile/:id', updateProfile)

module.exports = route