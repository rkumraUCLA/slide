const express = require('express')
const route  = express.Router()
const cors = require('cors');

// controller functions
const { loginUser, signupUser, getUsers, updateUser, addEvent, getLeaderboard , getUserEvents, getAllUsers, getUserById, updateProfile} = require('../controllers/userController')

// login route
route.post('/login', loginUser)

// signup route
route.post('/signup', signupUser)

// get all the users route
route.post('/getUsers', cors(), getUsers)

route.get('/getLeaderboard', getLeaderboard)

// update user information
route.patch('/updateUser', updateUser)

// addevents
route.patch('/addEvent/:id', addEvent)

route.get('/getUserEvents/:id', getUserEvents)

route.get('/getAllUsers', getAllUsers)

route.get('/getUserByID/:id', getUserById)

route.patch('/updateProfile/:id', updateProfile)

module.exports = route