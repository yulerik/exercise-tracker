import React, { useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Auth from './components/login/Auth'
import Profile from './components/profile/Profile.js'
import Forum from './components/forum/Forum.js'
import WrongRoute from './components/WrongRoute.js'
import ProfileHome from './components/profile/ProfileHome'
import ProfileUser from './components/profile/ProfileUser'
import Workout from './components/profile/WorkoutUpdated'
import WorkoutCard from './components/profile/WorkoutCard'
import ForumHome from './components/forum/ForumHome'
import ForumAll from './components/forum/ForumAll'
import ForumShare from './components/forum/ForumShare'
import ForumCard from './components/forum/ForumCard'
import { UserContext } from './context/UserProvider.js'
import { ProfileContext } from './context/profileProvider'
import { ForumContext } from './context/forumProvider'
import { ExerciseContext } from './context/exerciseProvider'

export default function App(){
  const { token } = useContext(UserContext)
  const { userExercises, getAllCategories, getAllExercises } = useContext(ExerciseContext)
  const { deleteWorkout, userWorkouts, getAllUserExercises, getUserWorkouts, getWorkoutsExercises } = useContext(ProfileContext)
  const { getAllForum, getQuestion, oneForum, likeQuestion, postForumComment, getAllComments, shareWorkout } = useContext(ForumContext)
  
  const allForumContext = useContext(ForumContext)
  const allProfileContext = useContext(ProfileContext)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (token) {
        getAllCategories()
        getWorkoutsExercises()
        // getUserWorkouts()
        // getAllExercises()
        // getAllUserExercises()
        // getAllForum()
        console.log('render')
        return () => { isMounted = false }
      } 
    }
  }, [token])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={ token ? <Navigate to='/profile' /> : <Auth /> } />
          <Route path='profile' element={ token ? <Profile /> : <Navigate to='/' replace /> } >
            <Route index element={ token ? <ProfileHome /> : <Navigate to='/' replace /> } />
            <Route path='user' element={ token ? <ProfileUser props={userExercises} /> : <Navigate to='/' replace /> } />
            <Route path='workouts' element= { token ? <Workout {...allProfileContext} /> : <Navigate to='/' replace /> } />
            <Route path='workouts/:workoutId' element= { token ? <WorkoutCard props={deleteWorkout} /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='forum' element={ token ? <Forum {...allForumContext} /> : <Navigate to='/' replace /> }>
            <Route index element={ token ? <ForumHome /> : <Navigate to='/' replace /> } /> 
            <Route path=':forumId' element={ token ? <ForumCard {...oneForum} post={postForumComment} like={likeQuestion} props={getQuestion} /> : <Navigate to='/' replace /> } />
            <Route path='share' element={ token ? <ForumShare /> : <Navigate to='/' replace /> } />
            <Route path='public' element= { token ? <ForumAll {...allForumContext} {...allProfileContext} /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='*' element={ token ? <WrongRoute /> : <Navigate to ='/' replace /> } />
        </Route>
      </Routes>
    </>
  )
}
