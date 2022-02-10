const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/questionComment')


// get all comments
commentRouter.get('/', (req, res, next) => {
    req.body.user = req.user._id
    Comment.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(er)
        }
        return res.status(200).send(comments)
    })
})
// get all comments for a question
commentRouter.get('/:forumId', (req, res, next) => {
    req.body.user = req.user._id
    Comment.find({questionId: req.params.forumId}, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})


module.exports = commentRouter