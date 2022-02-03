const express = require('express')
const workoutRouter = express.Router()
const Workout = require('../models/workout')

//get all workouts
workoutRouter.get('/', (req, res, next) => {
    Workout.find((err, workouts) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workouts)
    })
})
// post a new workout
workoutRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newWorkout = new Workout (req.body)
    newWorkout.save((err, workout) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workout)
    })
})
// delete a workout
workoutRouter.delete('/:workoutId', (req, res, next) => {
    req.body.user = req.user._id
    Workout.findOneAndDelete({_id: req.params.workoutId, user: req.user._id}, (err, deletedWorkout) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedWorkout)
    })
})
module.exports = workoutRouter