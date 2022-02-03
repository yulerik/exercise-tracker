import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileHome() {

    return (
        <>
            <h1>Welcome, this is the profile home page.</h1>
            <h2><Link to='/profile/user'>Add a new Workout</Link></h2>
            <h2><Link to='/profile/workouts'>View All Workouts</Link></h2>
        </>
    )
}