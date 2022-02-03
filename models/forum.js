const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    workout: {
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }

})

module.exports = mongoose.model('Forum', forumSchema)