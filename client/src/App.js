import React, { useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './components/login/Auth'
import Profile from './components/profile/Profile.js'
import Forum from './components/forum/Forum.js'
import WrongRoute from './components/WrongRoute.js'
import { UserContext } from './context/UserProvider.js'
import Workout from './components/profile/Workout.js'
import ProfileHome from './components/profile/ProfileHome'
import ProfileUser from './components/profile/ProfileUser'
import WorkoutCard from './components/profile/WorkoutCard'
import Layout from './components/Layout'
import ForumHome from './components/forum/ForumHome'
import ForumAll from './components/forum/ForumAll'
import ForumShare from './components/forum/ForumShare'
import ForumCard from './components/forum/ForumCard'
import { ExerciseContext } from './context/exerciseProvider'
import { ProfileContext } from './context/profileProvider'
import { ForumContext } from './context/forumProvider'

export default function App(){
  const { token } = useContext(UserContext)
  const { userExercises, getAllCategories, getAllExercises } = useContext(ExerciseContext)
  const { deleteWorkout, userWorkouts, getAllUserExercises, getUserWorkouts } = useContext(ProfileContext)
  const allForumContext = useContext(ForumContext)
  const { getAllForum, getQuestion, oneForum, likeQuestion } = useContext(ForumContext)

  useEffect(() => {
    getAllCategories()
    getUserWorkouts()
    getAllExercises()
    getAllUserExercises()
    getAllForum()

  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={ token ? <Navigate to='/profile' /> : <Auth /> } />
          <Route path='profile' element={ token ? <Profile /> : <Navigate to='/' replace /> } >
            <Route index element={ token ? <ProfileHome /> : <Navigate to='/' replace /> } />
            <Route path='user' element={ token ? <ProfileUser props={userExercises} /> : <Navigate to='/' replace /> } />
            <Route path='workouts' element= { token ? <Workout props={deleteWorkout} /> : <Navigate to='/' replace /> } >
              <Route path=':workoutId' element= { token ? <WorkoutCard props={deleteWorkout} /> : <Navigate to='/' repalce /> } />
            </Route>
          </Route>
          <Route path='forum' element={ token ? <Forum /> : <Navigate to='/' replace /> }>
            <Route index element={ token ? <ForumHome {...allForumContext} /> : <Navigate to='/' replace /> } /> 
            <Route path=':forumId' element={ token ? <ForumCard {...oneForum} like={likeQuestion} props={getQuestion} /> : <Navigate to='/' replace /> } />
            <Route path='share' element={ token ? <ForumShare allWorkouts={userWorkouts} /> : <Navigate to='/' replace /> } />
            <Route path='public' element= { token ? <ForumAll /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='*' element={ token ? <WrongRoute /> : <Navigate to ='/' replace /> } />
        </Route>
      </Routes>
    </>
  )
}
