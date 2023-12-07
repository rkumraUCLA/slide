const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')
const User = require('../models/userModel')
const Events = require('../models/eventModel')
const jwt = require('jsonwebtoken')
const { db } = require('../models/userModel')
const { useInRouterContext } = require('react-router-dom')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' })
}
// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token,  userId: user._id })
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
        res.status(200).json({email, token,  userId: user._id })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// all users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
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
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get user events
const getUserEvents = async(req, res) => {
    const userId = req.params.id

    if (mongoose.Types.ObjectId.isValid(userId)){// && mongoose.Types.ObjectId.isValid(eventId)) {
        db.collection('users')
            .updateOne({_id: new ObjectId(userId)}, {$push: {myEvents: eventId}})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error: 'Could not update the document'})
            })
    } else {
        res.status(400).json({ error: 'Invalid user or event ID' });
    }

    
    try {
        const user = await User.findById(userId);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const eventIds = user.myEvents; // Assuming myEvents is an array of event IDs
    
        // Assuming you have an Event model with event information
        const Event = require('path/to/your/event/model'); // Replace with the actual path to your event model
        const events = await Event.find({ _id: { $in: eventIds } });
    } catch (error) {
        console.log(error)
    }
}    

// add an event to a user's myEvents
const addEvent = async (req, res) => {
    const userId = req.params.id
    const eventId = req.body.myEvents; // Assuming you send the event ID in the request body

    if (mongoose.Types.ObjectId.isValid(userId)){// && mongoose.Types.ObjectId.isValid(eventId)) {
        db.collection('users')
            .updateOne({_id: new ObjectId(userId)}, {$push: {myEvents: eventId}, $inc: { eventsCreated: 1 }})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error: 'Could not update the document'})
            })
    } else {
        res.status(400).json({ error: 'Invalid user or event ID' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such User'})
    }

    const event = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!event) {
        return res.status(404).json({error: 'No such User'})
    }
    res.status(200).json(event)
}


// const addEvent = async (req, res) => {
//     const userId = req.params.id;
//     const updates = req.body;  // Get the event ID from request body

//     if(ObjectId.isValid(userId)){
//         db.collection('user')
//             .updateOne({_id: new ObjectId(userId)}, {$push: {myEvents: updates.eventId}})
//             .then(result =>{
//                 res.status(200).json(result)
//             })
//             .catch(err =>{
//                 res.status(500).json({error: 'Could not update the document'})
//             })
//     }
//     else{
//         res.status(500).json({error: 'Not a valid doc id'})    
//     }

    // try{
    //     const updatedUser = await User.findByIdAndUpdate(
    //         userId,
    //         { $push: { myEvents: eventToAdd } },
    //         { new: true} // Options
    //     );
    //     res.status(200).json(updatedUser);
    //     return events;
    //   } catch (error) {
    //     console.error('Error fetching registered events:', error.message);
    //     throw error; // Handle the error as needed in your application
    //   }
// }
module.exports = { 
    loginUser, 
    signupUser, 
    getUsers,
    getLeaderboard,
    getUserEvents,
    updateUser,
    addEvent,
    getAllUsers,
    getUserById
}