const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: String,
    category: {
        title: String,
        id: Number
    },
    id: String,
    desc: String,
    sets: [{
        reps: Number,
        setNum: Number,
        weight: Number
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)