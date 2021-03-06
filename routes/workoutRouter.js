const express = require('express')
const workoutRouter = express.Router()
const Workout = require('../models/workout')
const Shared = require('../models/sharedWorkout')

//get all workouts
workoutRouter.get('/', (req, res, next) => {
    req.body.user = req.user._id
    Workout.find({user: req.user._id},(err, workouts) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workouts)
    })
})
// get all liked workouts
workoutRouter.get('/liked', (req, res, next) => {
    req.body.user = req.user._id
    Shared.find( { 'likeWorkout': req.user._id }, (err, likedWorkouts) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(likedWorkouts)
    })
})
// get all shared workouts
workoutRouter.get('/shared', (req, res, next) => {
    req.body.user = req.user._id
    Shared.find((err, sharedWorkouts) =>{
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(sharedWorkouts)
    })
})
// like/unlike shared Workout
workoutRouter.put('/shared/:sharedId', (req, res, next) => {
    req.body.user = req.user._id
    Shared.findById({ _id: req.params.sharedId }, (err, sharedWorkout) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        const findId = sharedWorkout.likeWorkout.filter(each => each == req.user._id)
        console.log(findId)
        if (findId.length) Shared.findByIdAndUpdate(
            { _id: req.params.sharedId },
            { $pull: { 'likeWorkout': req.user._id } },
            (err, workoutShared) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(workoutShared)
            }
        )
        else Shared.findByIdAndUpdate(
            { _id: req.params.sharedId },
            { $addToSet: { 'likeWorkout': req.user._id } },
            (err, workoutShared) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(workoutShared)
            }
        )
    })
})
// get specific workout
workoutRouter.get('/:workoutId', (req, res, next) => {
    req.body.user = req.user._id
    Workout.find({ _id: req.params.workoutId }, (err, workout) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workout)
    })
})

// share a workout
workoutRouter.post('/shared', (req, res, next) => {
    req.body.user = req.user._id
    Workout.findOne({_id: req.body.sharedWorkout}, (err, workout) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (workout.shared.isShared) {
            res.status(403)
            return next(new Error('workout has already been shared'))
        }
        const newShared = new Shared(req.body)
        newShared.save((err, shared) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            Workout.findOneAndUpdate(
                {_id: shared.sharedWorkout}, 
                { 
                    $set: { 'shared.isShared' : true },
                    $addToSet: { 'shared.sharedId' : shared._id}
                },
                (err, updatedWorkout) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(updatedWorkout)
                }
            )
        })
    })
})
// delete workout from shared list
workoutRouter.delete('/:workoutId/:sharedId', (req, res, next) => {
    req.body.user = req.user._id
        Workout.findOneAndUpdate(
            {_id: req.params.workoutId}, 
            {
                $set: { 'shared.isShared' : false },
                $pull: { 'shared.sharedId' : req.params.sharedId}
            },
            (err, updatedWorkout) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                Shared.findOneAndRemove({ _id: req.params.sharedId }, (err, deletedShared) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(deletedShared)
                })
            }
        )
})
// post a new workout
workoutRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
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