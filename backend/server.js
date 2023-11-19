require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')

// express app instantiation
const app = express();
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routing
app.use('/api/events', eventRoutes)
app.use('/api/user', userRoutes)

// db connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port 4000!');
        })
    })
    .catch((error) => {
        console.log(error)
    })