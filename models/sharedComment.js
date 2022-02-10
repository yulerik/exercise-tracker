const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sharedCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    sharedId: {
        type: Schema.Types.ObjectId,
        ref: 'SharedWorkouts',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String
}) 

module.exports = mongoose.model("shared-comment", sharedCommentSchema)