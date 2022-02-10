import React, { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'

export default function ForumHome(props) {
    const {userQuestions, allWorkouts } = useOutletContext()

    const displayQuestions = userQuestions.map(question => 
        <Link to={question._id} state={question} key={question._id}>{question.question}</Link>
    )
    const displayWorkouts = allWorkouts.map(workout => 
        <div key={workout._id}>
            {workout.title}
        </div>
    )
    
    return (
        <>
            <h1>Forum Home</h1>
            {displayQuestions}
            {displayWorkouts}
        </>
    )
}