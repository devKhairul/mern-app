require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const workoutRoutes = require('./routes/workouts')

const app = express()

/**
 * Middleware
 */

app.use(express.json())



/**
 * Routes
 */

app.use('/api/workouts', workoutRoutes)



/**
 * Connect to DB
 */
mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log("Connected to DB. Listening on port", process.env.PORT);
            })
        })
        .catch((err) => {
            console.log(err)
        })


