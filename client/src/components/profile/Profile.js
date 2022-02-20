import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider.js'
import { ProfileContext } from '../../context/profileProvider'
import { ExerciseContext } from '../../context/exerciseProvider'

export default function Profile(props){
  const { 
    user: { 
      username 
    },
    token
  } = useContext(UserContext)
  const {  
    userExercises 
  } = useContext(ExerciseContext) 
  const {
    userWorkouts, 
    setAllUserWorkouts, 
    allUserExercises 
  } = useContext(ProfileContext)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (token) {
        props.renderForumProvider()
        return () => { isMounted = false }
      } 
    }
  }, [token])
  
  return (
    <div className="profile pt-16 w-full flex flex-col items-center h-full" >
      <nav id='nav-profile' className='bg-sky-300 w-5/12 rounded-full p-2 flex flex-row justify-around'>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/profile' >Profile</Link>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/profile/user'>New</Link>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/profile/workouts/' state={userWorkouts}>All</Link>
      </nav>
      <h1 className="text-3xl text-sky-500 pt-2 pb-2 font-bold" >Welcome @{username}!</h1>
      <Outlet  />
    </div>
  )
}