import { AnnotationIcon, ThumbUpIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'

export default function ForumHome(props) {
    const {userQuestions, allWorkouts } = useOutletContext()

    const displayWorkouts = allWorkouts.map(workout => 
        <div key={workout._id}>
            {workout.title}
        </div>
    )

    const flexRowCenter = 'flex flex-row gap-1 items-center'
    
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>Forum Home</h1>
            <div className='flex flex-col w-11/12 gap-1 items-center border-t'>
                <h3>Questions Asked</h3>
                {userQuestions.map(question =>
                <div className='border w-full p-1 rounded flex flex-row justify-between'>
                    <span className={flexRowCenter}>
                        <h4 className={flexRowCenter}>
                            <AnnotationIcon className='h-4 w-4' />
                            {question.comments.length}
                        </h4>
                        <h4 className={flexRowCenter}>
                            <ThumbUpIcon className='h-4 w-4' />
                            {question.likes.length}
                        </h4>
                    </span>
                    <h3>{question.question}</h3>
                    <Link 
                        to={question._id} 
                        state={question} 
                        key={question._id}
                        className='btn btn-xs'
                        >
                        View Question
                    </Link>
                </div>
                )}
            </div>
            {/* {displayWorkouts} */}
        </div>
    )
}