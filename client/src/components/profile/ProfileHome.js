import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileHome() {

    return (
        <div className='flex flex-col items-center gap-4'>
            <h1>This is your home page.</h1>
            <p className='w-1/2 text-center'>Click on New to add exercises to a workout. Or click All to view/share/delete your workouts.</p>
            <p className='w-1/2 text-center'>Click on Forum to go to your shared workouts, and to ask questions on the forum.</p>
            <Link className='btn btn-success btn-xs' to='/profile/user'>Add a new Workout</Link>
            <Link className='btn btn-success btn-xs' to='/profile/workouts'>View All Workouts</Link>
        </div>
    )
}