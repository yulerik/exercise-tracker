import React from 'react'
import { Link } from 'react-router-dom'

export default function WrongRoute(props) {
    return (
        <div className='wrong-route pt-20 text-center'>
            <h1>Wrong Route</h1>
            <p>Click on profile home to go back</p>
            <Link to='/profile' className='btn btn-info'>Profile Home</Link>
        </div>
    )
}