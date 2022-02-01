import React from 'react'
import NewWorkoutForm from './NewWorkoutForm'

export default function ProfileUser(props) {

    return (
        <>
            <h2>Profile User functions, ie add/edit</h2>
            <NewWorkoutForm {...props} />
        </>
    )
}