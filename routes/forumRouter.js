const express = require('express')
const forumRouter = express.Router()
const Forum = require('../models/forum')

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
// get forum question by id
forumRouter.get('/:forumId', (req, res, next) => {
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
    const newForum = new Forum (req.body)
    newForum.save((err, forum) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(forum)   
    })
})
// upvote question
forumRouter.put('/:forumId', (req, res, next) => {
    Forum.findOneAndUpdate(
        {_id: req.params.forumId, 'likes': { $nin: [req.user._id] }},
        {
          $addToSet:
            { 'likes': req.user._id}  
        },
        { new: true },
        (err, updatedQuestion) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            else if(!err & !updatedQuestion) {
                res.status(500)
                error = {
                    message: 'user already liked'
                }
                return next(error)
            }
            return res.status(200).send(updatedQuestion)
        }
    )
})

module.exports = forumRouter