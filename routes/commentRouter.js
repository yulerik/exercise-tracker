const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/questionComment')
const Forum = require('../models/forum')


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
// delete a comment
commentRouter.delete('/:commentId', (req, res, next) => {
    req.body.user = req.user._id
    Comment.findOneAndDelete({ _id: req.params.commentId }, (err, deletedComment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        Forum.findOneAndUpdate(
            { _id: deletedComment.questionId },
            { $pull: { 'comments': req.params.commentId } },
            { new: true },
            (err, updatedForum) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(deletedComment)
            }
        )
    })
})


module.exports = commentRouter