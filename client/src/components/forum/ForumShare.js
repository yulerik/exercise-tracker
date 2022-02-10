import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function ForumShare(props) {
    const { sharedWorkouts, notSharedWorkouts, shareWorkout, unshareWorkout } = useOutletContext()


    // const workoutsInit = {
    //     shared: userWorkouts.filter(each => each.shared.isShared),
    //     notShared: userWorkouts.filter(each => !each.shared.isShared)}
    // const [workouts, setWorkouts] = useState(workoutsInit)

    function handleShareClick(event) {
        event.preventDefault()
        const { id } = event.target
        shareWorkout(id)
    }
    function handleUnshareClick(event) {
        event.preventDefault()
        const { id, value } = event.target
        unshareWorkout(id, value)
    }


    useEffect(() => {
        console.log('use effect render')
    },[])

    return (
        <div className='forum-share grid grid-cols-4 gap-2 w-full'>
            <div className='col-start-1 col-end-3 flex flex-col'>
                <h1>Share a Workout</h1>
                {!notSharedWorkouts ? 'create a new workout to share' : notSharedWorkouts.map(each => 
                    <div className='dropdown dropdown-hover' key={each._id}>
                        <div className='m-1 btn w-full'>
                            {each.date}
                            <span>{each.title}</span>
                            <span>{(each.warmUp) ? ' Warmed up before' : ' Warming up next time'}</span>
                            <span>{each.exercises.length === 1 ? `${each.exercises.length} exercise` : `${each.exercises.length} exercises` }</span>
                        </div>    
                        <ul className='p-2 shadow menu dropdown-content bg-neutral rounded-box w-1/2'>
                        {each.exercises.map(exercise => 
                            <ul key={exercise._id}>
                                <li>{exercise.category.title}</li>
                                <li>{exercise.name}</li>
                                {exercise.sets.map(set => 
                                    <li key={set._id}>
                                        <p>{set.name}</p>
                                        {set.weight === 0 ? '' : <p>{set.weight}</p> }
                                    </li>
                                )}
                            </ul>
                        )}
                        <li><button id={each._id} onClick={handleShareClick} className='p-1 btn btn-xs bg-emerald-500'>Share Workout</button></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='col-start-3 col-end-5 flex flex-col'>
                <h1>Link to Shared Workouts</h1>
                {!sharedWorkouts ? 'add a workout to share' : sharedWorkouts.map(each => 
                    <div className='dropdown dropdown-hover' key={each._id}>
                        <div className='m-1 btn w-full'>
                            {each.date}
                            <span>{each.title}</span>
                            <span>{(each.warmUp) ? ' Warmed up before' : ' Warming up next time'}</span>
                            <span>{each.exercises.length === 1 ? `${each.exercises.length} exercise` : `${each.exercises.length} exercises` }</span>
                        </div>    
                        <ul className='p-2 shadow menu dropdown-content bg-neutral rounded-box w-1/2'>
                        {each.exercises.map(exercise => 
                            <ul key={exercise._id}>
                                <li>{exercise.category.title}</li>
                                <li>{exercise.name}</li>
                                {exercise.sets.map(set => 
                                    <li key={set._id}>
                                        <p>{set.name}</p>
                                        {set.weight === 0 ? '' : <p>{set.weight}</p> }
                                    </li>
                                )}
                            </ul>
                        )}
                        <li><button value={each.shared.sharedId[0]} id={each._id} onClick={handleUnshareClick} className="btn btn-xs bg-emerald-500" >Remove from Shared Workouts</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}