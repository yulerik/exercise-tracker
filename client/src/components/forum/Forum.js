import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ForumContext } from '../../context/forumProvider'


export default function Forum(){
  const forumContextValue = useContext(ForumContext)

  return (
    <div className="pt-20 bg-emerald-500">
      <nav id='nav-forum'>
        <Link to='/forum'>Forum</Link>
        <Link to='/forum/share'>Share</Link>
        <Link to='/forum/public/'>All</Link>
      </nav>
      <h3>public forum</h3>
      <div className='forum-outlet'>
        <Outlet />
      </div>
    </div>
  )
}