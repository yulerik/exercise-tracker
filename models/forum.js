const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['other', 'cardio', 'weights'],
        required: true,
        default: 'other'
    },
    subcategory: {
        type: String,
        default: 'other',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionComment'
    }]

})

module.exports = mongoose.model('Forum', forumSchema)