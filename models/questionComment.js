const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agree: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}) 

module.exports = mongoose.model("question-comment", questionCommentSchema)