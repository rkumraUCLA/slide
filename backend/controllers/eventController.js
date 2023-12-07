const Event = require('../models/eventModel')
const mongoose = require('mongoose')
const { addEvent } = require('./userController')

// get all events
const getAllEvents = async (req, res) => {
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)
}
// get a single event
const getEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findById(id)

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}
// create a new event
const createEvent = async (req, res) => {
    const {title, sport, spotsTotal, description, eventDate} = req.body

    try {
        const event = await Event.create({title, sport, spotsTotal, description, eventDate});
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// delete a event
const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})
    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }
    res.status(200).json(event)
}
// update a event
const updateEvent = async (req, res) => {
    const id = req.params
    const updates = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findByIdAndUpdate(
        id,
        { $set: updates, $push: { usersAssociated: updates.usersAssociated } },
        { new: true }
    )
    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }
    res.status(200).json(event)
}
module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
}