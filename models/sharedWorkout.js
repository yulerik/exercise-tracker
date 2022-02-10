const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Workout = require('./workout')


const sharedWorkoutSchema = new Schema({
    sharedWorkout: {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    sharedOn: {
        type: Date,
        default: Date.now
    },
    likeWorkout: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'SharedComment'
    }
})

module.exports = mongoose.model('shared-workout', sharedWorkoutSchema)