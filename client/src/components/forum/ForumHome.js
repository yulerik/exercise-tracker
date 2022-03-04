import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnnotationIcon, SparklesIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'
import { ForumContext } from '../../context/forumProvider'

export default function ForumHome(props) {
    const { tokenState, userQuestions, questionComments, questions, questionDelete, deleteComment, agreedComments } = useContext(ForumContext)

    const flexRowCenter = 'flex flex-row gap-1 items-center'

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            props.renderForumProvider()
            return () => isMounted =false
        }
    }, [tokenState])
    
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>Forum Home</h1> 
            <div className='w-full flex flex-row'>
                <div className='w-1/2'>
                    <h3 
                        className='text-center text-sky-300'
                        >
                        Questions Asked
                    </h3>
                    <div className=' items-center carousel carousel-vertical rounded-xl border-x border-sky-600 h-64'>
                        {userQuestions.map(question => {
                        return (
                        <div key={question._id} className='border-b carousel-item gap-4 p-2 shadow-2xl flex flex-col m-2 items-center justify-center w-full h-24 rounded-3xl border-sky-600'>
                            <h3>{question.question}</h3>
                            <span className={`${flexRowCenter} w-full justify-evenly`}>
                                <label 
                                    htmlFor={question._id} 
                                    className='btn btn-xs modal-button bg-red-900 border-red-500 text-red-200 hover:text-red-500'
                                    >
                                    <TrashIcon className='h-4 w-4' />
                                </label>
                                <input 
                                    type='checkbox' 
                                    id={question._id} 
                                    className='modal-toggle'
                                />
                                <div className='modal'>
                                    <div className='flex flex-col items-center gap-1 text-center border rounded bg-red-200  border-red-900 text-black p-4 w-64'>
                                        <p>Are you sure you want to delete this question?</p>
                                        <p>All likes/comments will be deleted as well.</p>
                                        <p>Hit delete to continue or cancel to go back.</p>
                                        <div className='modal-action'>
                                            <label htmlFor={question._id} className='btn btn-xs rounded-full'>Cancel</label>
                                            <button 
                                                className='btn btn-xs btn-outline rounded-full bg-red-700 text-black border-red-900' 
                                                onClick={() => questionDelete(question._id)}
                                                >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <h4 className={flexRowCenter}>
                                    <AnnotationIcon className='h-4 w-4' />
                                    {question.comments.length}
                                </h4>
                                <h4 className={`${flexRowCenter} text-green-600`}>
                                    <ThumbUpIcon className='h-4 w-4' />
                                    {question.likes.length}
                                </h4>
                                <Link 
                                    to={question._id} 
                                    state={question} 
                                    key={question._id}
                                    className='btn btn-xs rounded-full hover:text-green-500'
                                    >
                                    view
                                </Link>
                            </span>
                        </div>
                        )})}
                    </div>
                </div>
                <div className='w-1/2'>
                    <h3 className='text-sky-300 text-center'>Comments on questions</h3>
                    <div className='w-full carousel border-y rounded-xl gap-2 h-64 border-sky-600'>
                        {questionComments.map(each => {
                        let askedOn = questions.find(question => question._id == each.questionId)
                        return (
                            <div className=' border-sky-600 border-r-2 shadow-xl shadow-sky-800 carousel-item w-64 flex-col justify-around items-center p-2 rounded-2xl' key={each._id}>
                                <h4>{each.comment}</h4>
                                <span className={flexRowCenter}>
                                    <h4 className={`${flexRowCenter} badge badge-outline bg-yellow-900 text-yellow-200 border-yellow-500`}><SparklesIcon className='h-4 w-4'/>{each.agree.length}</h4>
                                    <label htmlFor={each._id} className='btn btn-xs modal-button bg-red-900 border-red-500 text-red-200 hover:text-red-500'>
                                        <TrashIcon className='h-4 w-4' />
                                    </label>
                                <input type='checkbox' id={each._id} className='modal-toggle'/>
                                    <div className='modal'>
                                        <div className='flex flex-col items-center gap-1 text-center border rounded bg-red-200 border-red-500 text-black p-4 w-64'>
                                            <p>Are you sure you want to delete this comment?</p>
                                            <p>All agrees will be deleted as well.</p>
                                            <p>Hit delete to continue or cancel to go back.</p>
                                            <div className='modal-action'>
                                                <label htmlFor={each._id} className='btn btn-xs rounded-full'>Cancel</label>
                                                <button 
                                                    className='btn btn-xs btn-outline rounded-full bg-red-700 text-black border-red-900' 
                                                    onClick={() => deleteComment(each._id)}
                                                    >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                                <Link
                                    to={each.questionId} 
                                    state={askedOn}
                                    key={each.questionId}
                                    className='btn btn-xs'
                                    >
                                    view question
                                </Link>
                            </div>) 
                        })}
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full text-center gap-1 justify-evenly'>
                <div className='flex flex-col w-5/12'>
                    <h3 
                        className='underline underline-offset-4 text-emerald-300'
                        >
                        Liked Questions
                    </h3>
                    <div className='carousel carousel-vertical h-64 gap-1'>
                        {questions.filter(each => {
                            const liked = each.likes.find(each => each === tokenState.user._id)
                            if (liked) return each
                        }).map(questionLiked => 
                        <div 
                            className='carousel-item flex-col items-center border-r rounded-xl p-1 border-emerald-400' 
                            key={questionLiked._id}
                            >
                            <p>{questionLiked.question}</p>
                            <span className={`${flexRowCenter} justify-around p-1 w-full`}>
                                <span 
                                    className={`${flexRowCenter} text-green-600`}
                                    >
                                    <ThumbUpIcon className='h-4 w-4'/>
                                        {questionLiked.likes.length}
                                </span>
                                <span 
                                    className={`${flexRowCenter} text-sky-500`}
                                    >
                                    <UserIcon className='h-4 w-4'/>
                                        {questionLiked.username}
                                </span>
                            </span>
                            <Link
                                to={questionLiked._id} 
                                state={questionLiked}
                                key={questionLiked._id}
                                className='btn btn-xs'
                                >
                                view question
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
                <div className='w-5/12'>
                    <h3 className='underline underline-offset-4 text-emerald-300'
                        >
                        Agreed Comments
                    </h3>
                    <div className='carousel carousel-vertical h-64 gap-1'>
                        {agreedComments.map(comment => {
                        const questionObj = questions.find(each => each._id === comment.questionId)
                        return (
                        <div 
                            className='carousel-item flex-col items-center border-l rounded-xl p-1 border-emerald-400' 
                            key={comment._id}
                            >
                            <p>{comment.comment}</p>
                            <span className={`${flexRowCenter} justify-around p-1 w-full`}>
                                <span 
                                    className={`${flexRowCenter} text-yellow-400`}
                                    >
                                    <SparklesIcon className='h-4 w-4'/>
                                        {comment.agree.length}
                                </span>
                                <span 
                                    className={`${flexRowCenter} text-sky-500`}
                                    >
                                    <UserIcon className='h-4 w-4'/>
                                        {comment.username}
                                </span>
                            </span>
                            <Link
                                to={comment.questionId} 
                                state={questionObj}
                                key={comment._id}
                                className='btn btn-xs'
                                >
                                view question
                            </Link>
                        </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    )
}