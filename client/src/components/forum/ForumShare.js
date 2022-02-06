import React from 'react'

export default function ForumShare(props) {
    const {allWorkouts} = props

    return (
        <>
            <h1>Forum Share</h1>
            {allWorkouts.length === 0 ? 'loading' : 'show workouts'}
        </>

    )
}