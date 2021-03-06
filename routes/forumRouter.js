const express = require('express')
const forumRouter = express.Router()
const Forum = require('../models/forum')
const Comment = require('../models/questionComment')
const Workout = require('../models/workout')
const Shared = require('../models/sharedWorkout')

// get all forum question
forumRouter.get('/', (req, res, next) => {
    req.body.user = req.user._id
    Forum.find((err, forums) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(forums)
    })
})
// get all shared workouts from workout db w/ shared flag
forumRouter.get('/share', (req, res, next) => {
    Workout.find({ 'shared.isShared': true }, (err, workouts) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workouts)
    })
})
// get liked workouts
forumRouter.get('/share/liked', (req, res, next) => {
    req.body.user = req.user._id 
    Shared.find({ 'likeWorkout': req.user._id }, (err, sharedWorkouts) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(sharedWorkouts)
    })
})
// get all comments on questions by a user
forumRouter.get('/comments', (req, res, next) => {
    req.body.user = req.user._id
    Comment.find({ user: req.user._id }, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})
// get forum question by id
forumRouter.get('/:forumId', (req, res, next) => {
    // req.body.user = req.user._id
    Forum.findOne({ _id: req.params.forumId }, (err, question) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(question)
    })
})
// post new forum question
forumRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    if (req.body.category === '') req.body.category = 'Other'
    if (req.body.subcategory === '') req.body.subcategory = 'other'
    const newForum = new Forum (req.body)
    newForum.save((err, forum) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(forum)   
    })
})
// post comment on question
forumRouter.post('/:forumId', (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    req.body.questionId = req.params.forumId
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
    })
    Forum.findOneAndUpdate(
        {_id: req.params.forumId},
        { $push: { comments: newComment._id } },
        { new: true },
        (err, question) => {
             if (err) {
                 res.status(500)
                 return next(err)
            }
            return res.status(200).send(newComment)
        }
    )
})
// get all comments
forumRouter.get('/:forumId/comments/', (req, res, next) => {
    Comment.find({questionId: req.params.forumId}, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})
// get a specific comment
forumRouter.get(`/:forumId/comments/:commentId`, (req, res, next) => {
    Comment.findById(
        {_id: req.params.commentId}, 
        { new: true}, 
        (err, comment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})
// like a specific comment on a question
forumRouter.put(`/:forumId/comments/:commentId`, (req, res, next) => {
    req.body.user = req.user._id
    Comment.findById(
        { _id: req.params.commentId },
        (err, comment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            const findId = comment.agree.filter(each => each == req.user._id)
            if (!findId.length) Comment.findByIdAndUpdate(
                { _id: req.params.commentId },
                { $addToSet: { 'agree': req.user._id } }, 
                (err, updatedComment) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(updatedComment)
                }
            )
            else Comment.findByIdAndUpdate(
                { _id: req.params.commentId, },
                { $pull: { 'agree': req.user._id }},
                (err, updatedComment) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(updatedComment)
                }
            )
        }
    )
})
// upvote question
forumRouter.put('/:forumId/like', (req, res, next) => {
    req.body.user = req.user._id
    Forum.findById(
        { _id: req.params.forumId },
        (err, question) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            const findId = question.likes.filter(each => each == req.user._id)
            if (!findId.length) Forum.findByIdAndUpdate(
                { _id: req.params.forumId },
                { $addToSet: { 'likes': req.user._id } }, 
                (err, updatedQuestion) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(updatedQuestion)
                }
            )
            else Forum.findByIdAndUpdate(
                { _id: req.params.forumId, },
                { $pull: { 'likes': req.user._id }},
                (err, updatedQuestion) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(updatedQuestion)
                }
            )
        }
    )
})
forumRouter.delete('/:questionId', (req, res, next) => {
    req.body.user = req.user._id
    Forum.findOneAndDelete({ _id: req.params.questionId }, (err, deletedComment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedComment)
    })
})


module.exports = forumRouter