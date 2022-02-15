import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Workout(props) {

    return (
        <div key='outlet' className='all-workouts flex flex-col items-center gap-3 w-full'>
            {props.userWorkouts.map(each => 
            <div key={each._id} className='flex flex-row items-center justify-between gap-1 border rounded-xl p-1 w-10/12'>
                <h4>{each.date}</h4>
                <h4>{each.title}</h4>
                <h4>{each.exercises.length} exercises</h4>
                {/* <Link to={each._id} state={each}>View Workout</Link> */}
                <Link className='btn btn-success btn-xs m-1.5 justify-self-end' state={each} to={`/profile/workouts/${each._id}`} key={each._id}>
                    View Workout
                </Link>
            </div>
            )}
        </div>
    )
}