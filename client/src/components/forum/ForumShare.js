import { UserCircleIcon } from '@heroicons/react/solid'
import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'

export default function ForumShare(props) {
    const { allShared : { shared } } = useOutletContext()

    return (
        <div className='forum-share grid grid-cols-4 gap-2 w-full'>
            <h1>All Shared Workouts</h1>
            <div className='col-start-1 col-end-5'>
                {!shared ? 'add a workout to share' : shared.map(each => 
                    <div className='border flex flex-col p-1' key={each._id}>
                        <span className='flex flex-row justify-between items-center w-full'>
                            <h3>{each.date}</h3>
                            <h3>{each.title}</h3>
                            <h3 className='flex flex-row gap-1 items-center'>
                            <UserCircleIcon className='h-5 w-5 text-sky-300' />
                            {each.username}
                            </h3>
                            <h3>{each.duration} mins</h3>
                            <h5>{(each.warmUp) ? ' Warmed up' : ' no warm up'}</h5>
                        </span>
                        <ul className='flex flex-row flex-wrap gap-5 p-1.5'>
                            {each.exercises.map(exercise => 
                                <ul key={exercise._id}>
                                    <li>{exercise.name}</li>
                                    <ul>
                                        <li>reps:</li>
                                        {exercise.sets.map(set => 
                                            <li key={set._id}>
                                                {set.weight === 0 ? <p>{`${set.reps}`}</p> :  <p>{`${set.reps} : ${set.weight}`}</p> }
                                            </li>
                                        )}
                                    </ul>
                                </ul>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}