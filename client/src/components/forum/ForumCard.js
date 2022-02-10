import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import AddForumComment from './AddForumComment'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import { ThumbUpIcon, StarIcon } from '@heroicons/react/solid'


export default function ForumCard(props) {
    const location = useLocation()
    const {oneForum, getForumCardInfo, postForumCommentUpdated, likeCommentQuestion, likeQuestion } = useOutletContext()
    const {_id} = location.state

    const [comment, setComment] = useState({comment: ''})

    function handleCommentChange(event) {
        const {name, value} = event.target
        setComment(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleLike(event) {
        likeQuestion(_id)
    }
    function handleAgree(event) {
        const { value, id } = event.target
        likeCommentQuestion(value, id)

    }
    function handleCommentSubmit(event) {
        event.preventDefault()
        // props.post(_id, comment)
        postForumCommentUpdated(_id, comment)
        setComment({comment: ''})
    }    
    useEffect(() => {
        // getForumCardInfo(_id).then(res => setForumCard(res))
        getForumCardInfo(_id)
    },[])

    const { category, subcategory, likes, question, user, username } = props.info
    
    return (
        <>
            <div className='forum-card rounded-full flex flex-col border-2 solid w-11/12 p-2 border-stone-400'>
                <span className='flex flex-row w-1/4 justify-evenly'>
                    <span className='badge bg-indigo-600 text-slate-300'>{category}</span>
                    <span className='badge bg-indigo-600 text-slate-300'>{subcategory}</span>
                    <span className='badge badge-info'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h1>{username}</h1>
                    </span>
                </span>
                <div className='flex flex-col items-center text-2xl tracking-wider p-1'>
                    <h1>{question}</h1>
                    <span className='self-end mr-5 badge badge-outline text-white'>{likes && likes.length}<ThumbUpIcon className='btn btn-xs btn-outline text-white' onClick={handleLike} /></span>
                </div>
            </div>
            <AddForumComment comment={comment} handleCommentChange={handleCommentChange} handleCommentSubmit={handleCommentSubmit} />
            <div className='w-full flex flex-col items-center'>
                { !props.info._id  ? 'loading' : props.comments.map(each => 
                    <div className='flex flex-row justify-between m-1 gap-2 w-8/12 badge badge-outline' key={each._id}>
                        <h5>{(each.agree.length === 0) ? `${each.agree.length} agree` : `${each.agree.length} agrees`}</h5>
                        <h2>{each.comment}</h2>
                        <button id={each._id} value={each.questionId} onClick={handleAgree} className='btn btn-xs btn-ghost'><StarIcon className='h-4 w-4' />agree</button>
                    </div>
                )}
            </div>
        </>
    )
}