const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    spotsTotal: {
        type: Number,
        required: true
    },
    spotsOpen: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    usersAssociated: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)