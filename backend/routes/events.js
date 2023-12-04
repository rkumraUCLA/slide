const express = require('express');
const Event = require('../models/eventModel')
// const requireAuth = require('../middlewareFunctions/requireAuthentication')

const route = express.Router()


const {
    createEvent,
    getEvent,
    getAllEvents,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController')

// route.use(requireAuth)

route.get('/', getAllEvents)

route.get('/:id', getEvent)

route.post('/', createEvent)

route.delete('/:id', deleteEvent)

route.patch('/:id', updateEvent)

module.exports = route
