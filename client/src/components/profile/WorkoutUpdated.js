import React, { useState, useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ProfileContext } from '../../context/profileProvider'

export default function Workout(props) {
    const { handleUserWorkoutsSort, userWorkouts, handleUserWorkoutSort, sortUserWorkouts, setSortUserWorkouts, getWorkoutsExercises } = useContext(ProfileContext)
    
    useEffect(() => {
            getWorkoutsExercises()
    },[])

    const sortInputClass = 'flex flex-row items-center p-1 gap-1'
    
    return (
        <div key='outlet' className='all-workouts flex flex-col items-center gap-3 w-full'>
            <div className='h-64 flex flex-row w-full'>
                <form onChange={handleUserWorkoutsSort} className='flex flex-col w-34 items-start text-sm gap-1 border-r'>
                    <span>
                        <label>sort by: </label>
                    </span>
                    <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='most-exercises' id='most-exercises'></input>
                        <label htmlFor='most-exercises'>most exercises</label>
                    </span>
                    <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='least-exercises' id='least-exercises'></input>
                        <label htmlFor='least-exercises'>least exercises</label>
                    </span>
                    <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='shared' id='shared'></input>
                        <label htmlFor='shared'>shared</label>
                    </span>
                    <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='private' id='private'></input>
                        <label htmlFor='private'>private</label>
                    </span>
                    {/* <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='newest-date' id='newest-date'></input>
                        <label htmlFor='newest-date'>date newest</label>
                    </span>
                    <span className={`${sortInputClass}`}>
                        <input type='radio' name='sort' className='' value='oldest-date' id='oldest-date'></input>
                        <label htmlFor='oldest-date'>date oldest</label>
                    </span> */}
                </form>
                <div className='carousel'>
                    {sortUserWorkouts.map(each => 
                    <div key={each._id} className='text-sm carousel-item flex flex-col items-center justify-between border border-sky-400 text-sky-200 rounded-xl p-1 w-48'>
                        <h4 className='text-white'>{each.date}</h4>
                        <h4 className='text-lg'>{each.title}</h4>
                        <h4 className=''>{each.exercises.length} exercises</h4>
                        {each.shared.isShared ? <h4 className='text-green-200'>public</h4> : <h4 className='text-red-300'>private</h4>}
                        <Link className='btn btn-success btn-xs m-1.5 justify-self-end' state={each} to={`/profile/workouts/${each._id}`} key={each._id}>
                            View
                        </Link>
                    </div>
                    )}
                </div>
            </div>
            <div className='w-3/4 text-center'>
                <h3>All Workouts</h3>
                <div className='h-60 carousel carousel-vertical gap-1 items-center'>
                    {!userWorkouts.length ? <p>No workouts added yet. Click on New to add workouts.</p> : userWorkouts.map(each => 
                    <div key={each._id} className='text-sm carousel-item flex flex-row items-center justify-between gap-2 border border-sky-400 text-sky-200 rounded-xl p-1 w-10/12'>
                        <h4 className='text-white'>{each.date}</h4>
                        <span className='w-full flex flex-row items-center justify-between ml-2'>
                            <span className='text-left'>
                                <h4 className='text-lg'>{each.title}</h4>
                                <h4 className=''>{each.exercises.length} exercises</h4>
                            </span>
                            {each.shared.isShared ? <h4 className='text-green-200'>public</h4> : <h4 className='text-red-300'>private</h4>}
                        </span>
                        <Link className='btn btn-success btn-xs m-1.5 justify-self-end' state={each} to={`/profile/workouts/${each._id}`} key={each._id}>
                            View
                        </Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}