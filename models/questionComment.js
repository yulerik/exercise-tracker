const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum'
    },
    agree: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}) 

module.exports = mongoose.model("QuestionComment", questionCommentSchema)