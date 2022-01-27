import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './components/login/Auth'
import Profile from './components/profile/Profile.js'
import Forum from './components/forum/Forum.js'
import WrongRoute from './components/WrongRoute.js'
import { UserContext } from './context/UserProvider.js'
import Workout from './components/profile/Workout.js'
import Layout from './components/Layout'

export default function App(){
  const { token } = useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={ token ? <Navigate to='/profile' /> : <Auth /> } />
          <Route path='profile' element={ token ? <Profile /> : <Navigate to='/' replace /> } >
            <Route path='workouts' element= { token ? <Workout /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='forum' element={ token ? <Forum /> : <Navigate to='/' replace /> } />
          <Route path='*' element={ token ? <WrongRoute /> : <Navigate to ='/' replace /> } />
        </Route>
      </Routes>
    </>



  )
}
