const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
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
        require: true
    }
})

module.exports = mongoose.model('Workout', workoutSchema)