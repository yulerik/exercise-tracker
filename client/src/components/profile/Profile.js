import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider.js'
import { ProfileContext } from '../../context/profileProvider'

export default function Profile(){
  const { 
    user: { 
      username 
    }
  } = useContext(UserContext)
  const { getUserWorkouts, userWorkouts } = useContext(ProfileContext)

  

  return (
    <div className="profile">
      <nav>
        <Link to='/profile'>Profile</Link>
        <Link to='/profile/user'>User</Link>
        <Link to='/profile/workouts/'>Workouts</Link>
      </nav>
      <h1>Welcome @{username}!</h1>
      <Outlet />
      
    </div>
  )
}