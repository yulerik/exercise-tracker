import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import AddForumComment from './AddForumComment'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import { ThumbUpIcon, SparklesIcon } from '@heroicons/react/solid'


export default function ForumCard(props) {
    const location = useLocation()
    const {oneForum, getForumCardInfo, postForumCommentUpdated, likeCommentQuestion, likeQuestion, getShared } = useOutletContext()
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
        console.log(value, id)
        // likeCommentQuestion(value, id)
    }
    function handleCommentSubmit(event) {
        event.preventDefault()
        // props.post(_id, comment)
        postForumCommentUpdated(_id, comment)
        setComment({comment: ''})
        getShared()
    }   
    useEffect(() => {
        // getForumCardInfo(_id).then(res => setForumCard(res))
        getForumCardInfo(_id)
        console.log('forum card render')
    },[])

    const { category, subcategory, likes, question, user, username } = props.info
    
    return (
        <>
            <div className='forum-card rounded-full flex flex-col border-2 solid w-11/12 p-2 border-stone-400 m-2'>
                <span className='flex flex-row justify-between items-center m-4'>
                    <span className='flex flex-row gap-1 m-2'>
                        <span 
                            className='bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900'
                            >
                            {category}
                        </span>
                        <span 
                            className='bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2 rounded dark:bg-pink-200 dark:text-pink-900'
                            >
                            {subcategory}
                        </span>

                    </span>
                    <span className='badge badge-info p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h1>{username}</h1>
                    </span>
                </span>
                <div 
                    className='flex flex-col items-center text-2xl tracking-wider'
                    >
                    <h1>{question}</h1>
                </div>
                <span
                    className='self-end flex flex-row items-center cursor-pointer gap-2 text-green-900 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-1 m-4 mr-5' 
                    onClick={handleLike}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg> 
                    <h3>{likes && likes.length}</h3>
                </span>
            </div>
            <AddForumComment comment={comment} handleCommentChange={handleCommentChange} handleCommentSubmit={handleCommentSubmit} />
            <div className='w-full flex flex-col items-center'>
                { !props.info._id  ? 'loading' : props.comments.map(each => 
                    <div 
                        className='flex flex-row justify-between m-1.5 p-4 gap-2 w-8/12 badge badge-outline h-full flex-wrap border-stone-400 border-1.5' key={each._id}>
                        <span className='basis-2/12 flex flex-row gap-1'>
                            <SparklesIcon className='h-5 w-5 text-yellow-300' />
                            <h5>{each.agree.length}</h5>
                        </span>
                        <h2 className='basis-6/12'>{each.comment}</h2>
                        <button
                            id={each._id} 
                            value={each.questionId} 
                            onClick={() => {likeCommentQuestion(each.questionId, each._id)}} 
                            className='basis-2/12 flex flex-row justify-center items-center gap-2 text-teal-900 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 hover:text-teal-300 rounded-lg text-sm p-1'
                            >
                            <SparklesIcon className='h-5 w-5'/>
                            <h3>agree</h3>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}