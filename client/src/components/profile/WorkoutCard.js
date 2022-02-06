import React from 'react'
import { useLocation } from 'react-router-dom'
import ProfileProvider from '../../context/profileProvider'

export default function WorkoutCard(props) {
    const location = useLocation()
    const {_id, date, duration, warmUp, exercises} = location.state

    function deleteButton() {
        props.props(_id)
        location.pathname='/profile/workouts'
    }

    return (
        <>  
            <div className='flex flex-row w-full justify-between items-center'>
                <h1 className='text-xl'>{date}</h1>
                <p>{duration} minutes</p>
                <p>Warm up: { warmUp ? 'Successful' : 'Next time!' }</p>
                <button className='badge badge-error' onClick={deleteButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 mr-2 stroke-current">   
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
                    </svg>

                    Delete
                </button>
            </div>
                {exercises.map(each => 
                    <div className='collapse w-full'>
                        <input type='checkbox'></input>
                        <span className='collapse-title flex flex-row w-full justify-between'><h3 className='self-start text-xl'>{each.name}</h3><span className='flex flex-row w-7/12 justify-evenly items-center'><span className='badge badge-outline text-l p-4'>{each.category.title}</span><h5 className='badge badge-outline'>{each.sets.length === 1 ? `${each.sets.length} set` : `${each.sets.length} sets`}</h5></span></span>
                        {/* <h2 className='collapse-title'>{each.name}<span> Category: {each.category.title}</span></h2> */}
                        <ul className='collapse-content flex flex-row justify-evenly'>
                            {each.sets.map(set => <li className='badge'><h6>reps: {set.reps}</h6><h6 className='badge badge-info my-2' style={{display: set.weight === 0 && 'none'}}>{` weight: ${set.weight}`}</h6></li>)}
                        </ul>
                        <hr></hr>
                    </div>
                )}
        </>
    )
}