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
            <h1 style={{fontSize: '1.32em', textDecoration: 'underline'}} >{date}</h1>
            <button onClick={deleteButton}>Delete Workout</button>
            <p>{duration} minutes</p>
            <p>Warm up: { warmUp ? 'Successful' : 'Next time!' }</p>
            <ul>
                {exercises.map(each => 
                    <li>
                        <span style={{fontWeight: 'bold'}}>{each.name}</span>
                        <br></br>
                        Category: {each.category.title}
                        <ul>
                        Sets: {each.sets.map(set => <li>reps: {set.reps} {set.weight === 0 ? '' : `| weight: ${set.weight}`}</li>)}
                        </ul>
                        <hr></hr>
                    </li>    
                )}
            </ul>
        </>
    )
}