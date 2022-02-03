import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ProfileContext } from '../../context/profileProvider'

export default function Workout(props) {
    const { userWorkouts } = useContext(ProfileContext)

    const workoutLinks = userWorkouts.map(each => 
        <div className='workout-link' id={each._id} >
            <Link state={each} to={`/profile/workouts/${each._id}`} key={each._id}>
                <h3>{each.date}</h3>
                <h4>Duration: {each.duration} minutes</h4>
                <h5>{each.warmUp ? 'Warmed up before workout' : 'Warming up next workout'}</h5>
                <ul>
                    {each.exercises.map(exercise => 
                        <li key={exercise._id}>
                            {exercise.name} |
                            category: {exercise.category.title} |
                            sets: {exercise.sets.length}
                        </li>    
                    )}
                </ul>
            </Link>
        </div>
    )

    return (
        <div className='workout'>
            <div className='all-workout-links'>
                {props.props.length === 0 ? <Link to='/profile/user' >Click here or on New to ad a workout</Link> : workoutLinks}
            </div>
            <div className='workout-card'>
                <h1 style={{fontSize: '1.6em', textDecoration: 'underline'}}>View Workout</h1>
                <Outlet />
            </div>
        </div>
    )
}