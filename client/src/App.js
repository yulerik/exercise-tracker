import React, { useContext } from 'react'
import { Link, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Auth from './components/login/Auth'
import Profile from './components/profile/Profile.js'
import Forum from './components/forum/Forum.js'
import WrongRoute from './components/WrongRoute.js'
import { UserContext } from './context/UserProvider.js'
import Workout from './components/profile/Workout.js'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <>
      <nav style={{display: !token && 'none'}}>
        <Link to='/profile'>Home</Link>
        <Link to='/forum'>Forum</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <Routes>
        <Route path='/' element={ token ? <Navigate to='/profile' /> : <Auth /> } />
        <Route path='/profile' element={ token ? <Profile /> : <Navigate to='/' replace /> } >
          <Route path='/profile/workouts' element= { token ? <Workout /> : <Navigate to='/' replace /> } />
        </Route>
        <Route path='/forum' element={ token ? <Forum /> : <Navigate to='/' replace /> } />
        <Route path='/*' element={ token ? <WrongRoute /> : <Navigate to ='/' replace /> } />
      </Routes>
    </>



  )
}
