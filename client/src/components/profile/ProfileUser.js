import React from 'react'
import NewWorkoutForm from './NewWorkoutForm'

export default function ProfileUser(props) {

    return (
        <>
            <h2>Create a new workout</h2>
            <NewWorkoutForm key='newWorkout' {...props} />
        </>
    )
}