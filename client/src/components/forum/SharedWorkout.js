import React from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'

export default function SharedWorkout(props) {
    const location = useLocation()
    const {} = location.state

    return (
        <div>
            <h1>shared workout</h1>
        </div>
    )
}