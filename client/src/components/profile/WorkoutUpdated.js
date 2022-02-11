import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Workout(props) {

    return (
        <div className='all-workouts w-full'>
            <div className='Workouts m-2 carousel carousel-center bg-neutral rounded-box'>
                {props.userWorkouts.map(workout => 
                <>
                    <label className='carousel-item' for='my-modal-2' key={workout._id}>
                        <div className='border border-sky-400 text-slate-300 rounded-xl m-2 p-3 hover:opacity-25 hover:cursor-pointer flex flex-col items-center gap-1'>
                            <h2 className=''>{workout.title}</h2>
                            <h3>{workout.date}</h3>
                            <p>{workout.duration} minutes</p>
                            {workout.exercises.length === 1 ? <p>{workout.exercises.length} exercise</p> : <p>{workout.exercises.length} exercises</p> }
                            {workout.shared.isShared? <p className='badge badge-outline text-success' >shared</p> : <p className='badge badge-outline text-error' >private</p> }
                        </div>

                    </label>
                    <input type='checkbox' className='modal-toggle' id='my-modal-2'></input>
                    <div className='modal'>
                        <div className='modal-box'>
                            <p>test</p>
                            <h1>{workout.title}</h1>
                            <h3>duration: {workout.duration}</h3>
                        <div className='modal-action'>
                            <label for='my-modal-2' className='btn'>Close</label>
                            <Link state={workout} to ={`/profile/workouts/${workout._id}`} className='btn btn-info'>
                                view workout
                            </Link>
                        </div>
                        </div>
                    </div>
                </>
                )}
            </div>
            <Outlet />
        </div>
    )
}