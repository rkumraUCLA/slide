const express = require('express');
const route = express.Router()
const Event = require('../models/eventModel')
const {
    createEvent,
    getEvent,
    getAllEvents,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController')

route.get('/', getAllEvents)

route.get('/:id', getEvent)

route.post('/', createEvent)

route.delete('/:id', deleteEvent)

route.patch('/:id', updateEvent)

module.exports = route
