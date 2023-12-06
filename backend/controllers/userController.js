const mongoose = require('mongoose')
const User = require('../models/userModel')
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
        res.status(200).json({email, token,  userId: user._id })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password, userName, fullName, age, sports } = req.body
    try {
        const user = await User.signup(email, password, userName, fullName, age, sports)
        const token = createToken(user._id)
        res.status(200).json({email, token,  userId: user._id })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// return users
const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


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

const addEvent = async (req, res) => {
    const userId = req.params.userId;
    const { eventId } = req.body;  // Get the event ID from request body

    try{
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { myEvents: eventToAdd } },
            { new: true} // Options
        );
        res.status(200).json(updatedUser);
    }
    catch{
        res.status(500).json({ message: 'Error adding event', error: error });
    }

}

module.exports = { 
    loginUser, 
    signupUser, 
    getUsers,
    updateUser,
    addEvent
}