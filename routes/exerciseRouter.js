const express = require('express')
const exerciseRouter = express.Router()
const Exercise = require('../models/exercise')

// get all workouts
exerciseRouter.get('/', (req, res, next) => {
    req.body.user = req.user._id
    Exercise.find({user: req.user._id}, (err, exercises) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercises)
    })
})
// get all workouts for shared, no user req
exerciseRouter.get('/forum', (req, res, next) => {
    Exercise.find((err, exercises) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercises)
    })
})

// post new workout
exerciseRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newExercise = new Exercise (req.body)
    newExercise.save((err, exercise) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercise)   
    })
})


module.exports = exerciseRouter