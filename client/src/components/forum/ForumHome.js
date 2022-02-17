import React, { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { AnnotationIcon, SparklesIcon, ThumbUpIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'

export default function ForumHome(props) {
    const {userQuestions, allWorkouts, questionComments, questions, questionDelete, deleteComment } = useOutletContext()

    const flexRowCenter = 'flex flex-row gap-1 items-center'
    
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>Forum Home</h1>
            <h3>Questions Asked</h3>
            <div className='w-10/12 items-center carousel carousel-vertical rounded-box border-x h-48 p-2 px-6'>
                {userQuestions.map(question => {
                    return (
                    <div key={question._id} className='carousel-item gap-4 p-2 rounded-full flex flex-col m-2 items-center justify-center w-3/4 h-24'>
                        <h3>{question.question}</h3>
                        <span className={`${flexRowCenter} w-full justify-evenly`}>
                            <label htmlFor={question._id} className='btn btn-xs modal-button bg-red-900 border-red-500 text-red-200 hover:text-red-500'>
                                <TrashIcon className='h-4 w-4' />
                            </label>
                            <input type='checkbox' id={question._id} className='modal-toggle'/>
                                <div className='modal'>
                                    <div className='flex flex-col items-center gap-1 text-center border rounded bg-red-400 border-red-500 text-black p-4 w-64'>
                                        <p>Are you sure you want to delete this question?</p>
                                        <p>All likes/comments will be deleted as well.</p>
                                        <p>Hit delete to continue or cancel to go back.</p>
                                        <div className='modal-action'>
                                            <label htmlFor={question._id} className='btn btn-xs rounded-full'>Cancel</label>
                                            <button 
                                                className='btn btn-xs btn-outline rounded-full hover:bg-red-700 hover:text-black hover:border-red-900' 
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
                                className='btn btn-xs hover:text-green-500'
                                >
                                View Question
                            </Link>
                        </span>
                    </div>
                )})}
            </div>
            <h3>Comments on questions</h3>
            <div className='w-full carousel border-y rounded-xl gap-2 h-64'>
                {questionComments.map(each => {
                let askedOn = questions.find(question => question._id == each.questionId)
                return (
                    <div className='carousel-item w-64 flex-col justify-around items-center p-2 rounded-full' key={each._id}>
                        <span className={flexRowCenter}>
                            <h4 className={`${flexRowCenter} badge badge-outline bg-yellow-900 text-yellow-200 border-yellow-500`}><SparklesIcon className='h-4 w-4'/>{each.agree.length}</h4>
                            <label htmlFor={each._id} className='btn btn-xs modal-button bg-red-900 border-red-500 text-red-200 hover:text-red-500'>
                                <TrashIcon className='h-4 w-4' />
                            </label>
                        <input type='checkbox' id={each._id} className='modal-toggle'/>
                            <div className='modal'>
                                <div className='flex flex-col items-center gap-1 text-center border rounded bg-red-400 border-red-500 text-black p-4 w-64'>
                                    <p>Are you sure you want to delete this comment?</p>
                                    <p>All agrees will be deleted as well.</p>
                                    <p>Hit delete to continue or cancel to go back.</p>
                                    <div className='modal-action'>
                                        <label htmlFor={each._id} className='btn btn-xs rounded-full'>Cancel</label>
                                    </div>
                                    <button 
                                        className='btn btn-xs btn-outline rounded-full hover:bg-red-700 hover:text-black hover:border-red-900' 
                                        onClick={() => deleteComment(each._id)}
                                        >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </span>
                        <h4>{each.comment}</h4>
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
    )
}