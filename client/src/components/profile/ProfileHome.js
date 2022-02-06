import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileHome() {

    return (
        <div className='text-center'>
            <h1>This is your home page.</h1>
            <p>Click on New to add exercises to a workout. Or click All to view/edit all your workouts.</p>
            <Link className='btn btn-success btn-xs' to='/profile/user'>Add a new Workout</Link>
            <Link className='btn btn-success btn-xs' to='/profile/workouts'>View All Workouts</Link>
        </div>
    )
}