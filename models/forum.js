const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        default: 'other'
    },
    subcategory: {
        type: String,
        default: 'other'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionComment'
    }],
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Forum', forumSchema)