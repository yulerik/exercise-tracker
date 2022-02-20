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
import SharedWorkout from './components/forum/SharedWorkout'
import ForumCard from './components/forum/ForumCard'
import { UserContext } from './context/UserProvider.js'
import { ProfileContext } from './context/profileProvider'
import { ForumContext } from './context/forumProvider'
import { ExerciseContext } from './context/exerciseProvider'

export default function App(){
  const { token } = useContext(UserContext)
  const { userExercises, getAllCategories } = useContext(ExerciseContext)
  const { deleteWorkout, getWorkoutsExercises, getWorkout } = useContext(ProfileContext)
  const { getQuestion, oneForum, likeQuestion, postForumComment, getShared, renderForumProvider } = useContext(ForumContext)
  
  const allForumContext = useContext(ForumContext)
  const allProfileContext = useContext(ProfileContext)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (token) {
        getAllCategories()
        getWorkoutsExercises()
        getShared()
        console.log('render app')
        return () => isMounted = false 
      } 
    }
  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={ token ? <Navigate to='/profile' /> : <Auth /> } />
          <Route path='profile' element={ token ? <Profile renderForumProvider={renderForumProvider} /> : <Navigate to='/' replace /> } >
            <Route index element={ token ? <ProfileHome /> : <Navigate to='/' replace /> } />
            <Route path='user' element={ token ? <ProfileUser props={userExercises} /> : <Navigate to='/' replace /> } />
            <Route path='workouts' element= { token ? <Workout {...allProfileContext} /> : <Navigate to='/' replace /> } />
            <Route path='workouts/:workoutId' element= { token ? <WorkoutCard props={deleteWorkout} getWorkout={getWorkout} getWorkoutsExercises={getWorkoutsExercises} /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='forum' element={ token ? <Forum {...allForumContext} /> : <Navigate to='/' replace /> }>
            <Route index element={ token ? <ForumHome /> : <Navigate to='/' replace /> } /> 
            <Route path=':forumId' element={ token ? <ForumCard {...oneForum} post={postForumComment} like={likeQuestion} props={getQuestion} /> : <Navigate to='/' replace /> } />
            <Route path='share' element={ token ? <ForumShare /> : <Navigate to='/' replace /> } />
            <Route path='share/:shareId' element={ token ? <SharedWorkout /> : <Navigate to='/' replace /> } />
            <Route path='public' element={ token ? <ForumAll {...allForumContext} {...allProfileContext} /> : <Navigate to='/' replace /> } />
          </Route>
          <Route path='*' element={ token ? <WrongRoute /> : <Navigate to ='/' replace /> } />
        </Route>
      </Routes>
    </>
  )
}
