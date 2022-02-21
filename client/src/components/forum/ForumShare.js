import { ThumbUpIcon, UserCircleIcon } from '@heroicons/react/solid'
import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'

export default function ForumShare(props) {
    const { allShared : { shared, allShared, filter }, likeSharedWorkout, handleLikedWorkoutsFilter } = useOutletContext()

    function handleLike(event) {
        const { id } = event.target
        console.log(id)
    }
    const displayFilter = filter.length === 0 ? '' : filter.map(each => 
        <div className='flex flex-col p-1' key={each.sharedObj._id}>
        <span className='flex flex-row justify-between items-center w-full border-b-2 border-sky-700'>
            <h3>{each.sharedObj.date}</h3>
            <h3>{each.sharedObj.title}</h3>
            <h3 className='flex flex-row gap-1 items-center'>
            <UserCircleIcon className='h-5 w-5 text-sky-300' />
            {each.sharedObj.username}
            </h3>
            <h3>{each.sharedObj.duration} mins</h3>
            <h5>{(each.sharedObj.warmUp) ? ' Warmed up' : ' no warm up'}</h5>
            <button id={each._id} onClick={() => likeSharedWorkout(each._id)} className='flex flex-row items-center gap-1 btn btn-xs'>
                <ThumbUpIcon className='h-4 w-4'/>
                {each.likeWorkout.length}
            </button>
        </span>
        <ul className='flex flex-row flex-wrap gap-5 p-1.5'>
            {each.sharedObj.exercises.map(exercise => 
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
    )

    return (
        <div className='forum-share grid grid-cols-4 gap-2 w-full'>
            <div className='col-start-1 col-end-5 justify-self-center flex flex-row justify-evenly items-center w-full'>
                <h1>All Shared Workouts</h1>
                <form className='form-control' onChange={handleLikedWorkoutsFilter}>
                    <span className='flex flex-row gap-1 items-center'>
                        <input className='form-radio text-pink-500' type='radio' name='filter' id='all' value='all'></input>
                        <label htmlFor='all'>All</label>
                    </span>
                    <span className='flex flex-row gap-1 items-center'>
                        <input type='radio' name='filter' id='liked' value='liked'></input>
                        <label htmlFor='liked'>Liked</label>
                    </span>
                </form>
            </div>
            <div className='col-start-1 col-end-5'>
                {displayFilter}
            </div>
            <div style={{display: filter.length && 'none'}} className='col-start-1 col-end-5'>
                {!shared ? 'add a workout to share' : shared.map(each => {
                const sharedObj = allShared.find(sharedWorkout => sharedWorkout.sharedWorkout == each._id)
                return (
                <div className='flex flex-col p-1' key={each._id}>
                <span className='flex flex-row justify-between items-center w-full border-b-2 border-sky-700'>
                    <h3>{each.date}</h3>
                    <h3>{each.title}</h3>
                    <h3 className='flex flex-row gap-1 items-center'>
                    <UserCircleIcon className='h-5 w-5 text-sky-300' />
                    {each.username}
                    </h3>
                    <h3>{each.duration} mins</h3>
                    <h5>{(each.warmUp) ? ' Warmed up' : ' no warm up'}</h5>
                    <button id={sharedObj._id} onClick={() => likeSharedWorkout(sharedObj._id)} className='flex flex-row items-center gap-1 btn btn-xs'>
                        <ThumbUpIcon className='h-4 w-4'/>
                        {sharedObj.likeWorkout.length}
                    </button>
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
                </div>)})}
            </div>
        </div>
    )
}