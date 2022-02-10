const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
    warmUp: Boolean,
    duration: {
        type: Number,
        default: 0,
        required: true   
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    shared: {
        isShared: {
            type: Boolean,
            default: false,
            required: true
        },
        sharedId: [{
            type: Schema.Types.ObjectId,
            ref: 'SharedWorkout'
        }]
    }   
})

module.exports = mongoose.model('Workout', workoutSchema)