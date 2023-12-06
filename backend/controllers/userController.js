const mongoose = require('mongoose')
const User = require('../models/userModel')
const Events = require('../models/eventModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' })
}
// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password, userName, fullName, age, sports, eventsCreated } = req.body
    try {
        const user = await User.signup(email, password, userName, fullName, age, sports, eventsCreated)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// return users
const getUsers = async(req, res) => {
    const { sports } = req.body
    try {
        const users = await User.findMatches(sports)
        if (!users){
            res.status(200).json("No matches")
        }
        else {
            res.status(200).json({users})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    //res.status(200).json(users)
}

const getLeaderboard = async(req, res) => {
    const users = await User.find().sort({ eventsCreated: -1 })
    if (!users) {
        res.status(400).json({error})
    }
    else {
        res.status(200).json(users)
    }
}

const getUserEvents = async(req, res) => {
    userId = req.params;
    try {
        const user = await User.findById(userId);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const eventIds = user.myEvents; // Assuming myEvents is an array of event IDs
    
        // Assuming you have an Event model with event information
        const Event = require('path/to/your/event/model'); // Replace with the actual path to your event model
        const events = await Event.find({ _id: { $in: eventIds } });
    
        return events;
      } catch (error) {
        console.error('Error fetching registered events:', error.message);
        throw error; // Handle the error as needed in your application
      }
}
module.exports = { 
    loginUser, 
    signupUser, 
    getUsers,
    getLeaderboard,
    getUserEvents
}