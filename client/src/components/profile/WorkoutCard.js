import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ForumContext } from '../../context/forumProvider'

export default function WorkoutCard(props) {
    const location = useLocation()
    const {_id, date, duration, warmUp, exercises, shared: { isShared, sharedId }} = location.state
    const { sharedWorkouts, shareWorkout, unshareWorkout, getShared } = useContext(ForumContext)

    const [workoutShared, setWorkoutShared] = useState(isShared)

    function handleShareClick(event) {
        event.preventDefault()
        const { id } = event.target
        shareWorkout(id)
        props.getWorkoutsExercises()
        setWorkoutShared(prevState => !prevState)
    }
    function handleUnshareClick(event) {
        event.preventDefault()
        const { id, value } = event.target
        unshareWorkout(id, value)
        props.getWorkoutsExercises()
        setWorkoutShared(prevState => !prevState)
    }
    function deleteButton() {
        props.props(_id)
        getShared()
        location.pathname='/profile/workouts'
    }

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            
            return () => { isMounted = false}
        }
        // console.log(props.getWorkout(_id))
    },[])

    return (
        <>  
            <div key={_id} className='flex flex-row w-full justify-between items-center'>
                <h1 className='text-xl'>{date}</h1>
                <p>{duration} minutes</p>
                <p>Warm up: { warmUp ? 'Successful' : 'Next time!' }</p>
                <button className='badge badge-error' onClick={deleteButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 mr-2 stroke-current">   
                        <path strokeLinecap="round" stroke="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>                       
                    </svg>
                    Delete
                </button>
            </div>
            <div className='w-full flex flex-col items-center'>
            {exercises.map(each => 
                <div className='collapse w-full mb-2' key={each._id}>
                    <input type='checkbox'></input>
                    <span className='collapse-title flex flex-row w-full justify-between'>
                        <h3 className='self-start text-xl'>
                            {each.name}
                        </h3>
                        <span className='flex flex-row w-7/12 justify-evenly items-center'>
                            <span className='badge badge-outline text-l p-4'>
                                {each.category.title}
                            </span>
                            <h5 className='badge badge-outline'>
                                {each.sets.length === 1 ? `${each.sets.length} set` : `${each.sets.length} sets`}
                            </h5>
                        </span>
                    </span>
                    <ul className='collapse-content flex flex-row justify-evenly'>
                        {each.sets.map(set => 
                            <li key={set._id} className='badge'>
                                <h6>reps: {set.reps}</h6>
                                <h6 
                                    className='badge badge-info my-2' 
                                    style={{display: set.weight === 0 && 'none'}}
                                    >
                                    {` weight: ${set.weight}`}
                                </h6>
                            </li>)}
                    </ul>
                    <hr></hr>
                </div>
                )}
                { !workoutShared ? 
                    <button 
                        onClick={handleShareClick} 
                        id={_id} 
                        className='btn btn-sm text-green-400 border-green-900'
                        >
                            Share Workout
                    </button> 
                : 
                    <button 
                        onClick={handleUnshareClick} 
                        id={_id}
                        value={sharedId[0]}
                        className='btn btn-sm text-red-400 border-red-900'
                        >
                            Make Workout Private
                        </button> }
            </div>
        </>
    )
}