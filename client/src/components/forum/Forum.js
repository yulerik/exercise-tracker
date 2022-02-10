import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ForumContext } from '../../context/forumProvider'
import { UserContext } from '../../context/UserProvider'


export default function Forum(props){
  const { 
    user: { 
      username 
    }
  } = useContext(UserContext)
  const forumContextValue = useContext(ForumContext)

  useEffect(() => {
    // props.getForumQuestions()
    props.getWorkouts()
  },[])
  
  return (
    <div className='forum pt-16 w-full flex flex-col items-center h-full'>
      <nav id='nav-forum' className='bg-emerald-300 w-5/12 rounded-full p-2 flex flex-row justify-around'>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/forum'>Forum</Link>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/forum/share'>Share</Link>
        <Link className='text-slate-700 btn btn-outline btn-sm rounded-full' to='/forum/public/'>All</Link>
      </nav>
      <h1 className="text-3xl text-emerald-500 pt-2 pb-2 font-bold" >Hello @{username}!</h1>
      <Outlet context={props} />
    </div>
  )
}