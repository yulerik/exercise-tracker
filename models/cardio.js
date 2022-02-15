const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardioSchema = new Schema({
    name: String,
    sets: [{
        distance: Number,
        setNum: Number,
        time: Number
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Cardio', cardioSchema)