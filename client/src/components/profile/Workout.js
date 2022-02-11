import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ProfileContext } from '../../context/profileProvider'

export default function Workout(props) {
    // const { userWorkouts } = useContext(ProfileContext)
    const { userWorkouts } = props

    const workoutLinks = userWorkouts.map(each => 
        <div className='workout-link w-full flex flex-col items-center' id={each._id} >
            <div className='w-11/12 flex flex-row justify-evenly tabs mt-2 mb-1 px-2'>
                <h3 className='w-1/3 text-white tab tab-xs tab-lifted tab-active'>{each.date}</h3>
                <h4 className='w-1/3 text-white tab tab-xs tab-lifted'>Duration: {each.duration} minutes</h4>
                <h5 className='w-1/3 text-white tab tab-xs tab-lifted'>{each.warmUp ? 'Warmed up before!' : 'Warming up next time!'}</h5>
            </div>
            <ul className='collapse w-11/12 border rounded-box border-base-300 collapse-arrow'>
                <input type='checkbox'></input>
                <li className='collapse-title text-lg'>Exercises: <span className='text-xs'>
                    {each.exercises.map(exercise => {
                        if (each.exercises[each.exercises.length -1] === exercise) {
                            return `${exercise.name}` 
                        }
                        return `${exercise.name}, `
                    })}</span></li>
                <ul className='collapse-content'>
                    <hr></hr>
                    <br></br>
                {each.exercises.map(exercise => 
                <>
                    <li>{exercise.name}</li>
                    <li className='flex flex-row w-full justify-around px-9'>category: <span className='text-lime-500 badge badge-outline'>{exercise.category.title}</span> sets: <span className='text-lime-500 badge badge-outline'>{exercise.sets.length}</span></li>
                </>
                )}
                <li className='w-full flex flex-row justify-end'>
                    <Link className='btn btn-success mt-3 justify-self-end' state={each} to={`/profile/workouts/${each._id}`} key={each._id}>
                        View Workout
                    </Link>
                </li>
                </ul>    
            </ul>
        </div>
    )

    return (
        <div className='workout grid grid-cols-8 w-full'>
            <div className='all-workout-links col-start-1 col-end-5'>
                {/* {props.props.length === 0 ? <Link to='/profile/user' >Click here or on New to add a workout</Link> : workoutLinks} */}
            </div>
            <div className='workout-card col-start-5 col-end-9 flex flex-col items-center'>
                <h1 className='text-4xl underline underline-offset-2 text-lime-400'>View Workout</h1>
                <Outlet />
            </div>
        </div>
    )
}