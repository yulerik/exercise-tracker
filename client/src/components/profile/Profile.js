import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider.js'
import { ProfileContext } from '../../context/profileProvider'
import { ExerciseContext } from '../../context/exerciseProvider'

export default function Profile(){
  const { 
    user: { 
      username 
    }
  } = useContext(UserContext)
  const { 
    getAllExercises, 
    userExercises 
  } = useContext(ExerciseContext) 
  const { 
    getAllUserExercises, 
    getUserWorkouts, 
    userWorkouts, 
    setAllUserWorkouts, 
    allUserExercises 
  } = useContext(ProfileContext)

  useEffect(() => {
    getUserWorkouts()
    getAllExercises()
    getAllUserExercises()
  }, [])  

  return (
    <div className="profile">
      <nav id='nav-profile'>
        <Link to='/profile' >Home</Link>
        <Link to='/profile/user'>New</Link>
        <Link to='/profile/workouts/' state={userWorkouts}>All</Link>
      </nav>
      <h1>Welcome @{username}!</h1>
      <Outlet />
      
    </div>
  )
}