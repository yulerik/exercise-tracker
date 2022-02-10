import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const ProfileContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ProfileProvider(props) {
    const userExercisesInit = {
        ids: [],
        objects: []
    }

    // const [mount, setMount] = useState({isMounted: false})
    const [userWorkouts, setUserWorkouts] = useState([])
    const [allUserExercises, setAllUserExercises] = useState(userExercisesInit)

    function shareWorkout(workoutId) {
        userAxios.post('/api/workout/shared', {"sharedWorkout": workoutId})
            .then(res => {
                // setUserWorkouts(prevState => [...prevState, res.data])
                getUserWorkouts()
            })
            .catch((err) => console.log(err))
    }
    
    function deleteWorkout(workoutId) {
        userAxios.delete(`/api/workout/${workoutId}`)
            .then(res => setUserWorkouts(prevState => prevState.filter(each => each._id !== res.data._id)))
            .catch(err => console.log(err))
    }
    function findExerciseObj(exerciseId) {
        return allUserExercises.objects.find(each => each._id === exerciseId)
    }
    function getUserWorkouts() {
        userAxios.get('/api/workout/')
            .then(res => {
                const allExercises = []
                res.data.map(each =>   allExercises.push(...each.exercises))
                setUserWorkouts(prevState => [...prevState, ...res.data])
                setAllUserExercises(prevState => ({
                    ...prevState, 
                    ids: [...prevState.ids, ...allExercises]
                }))
                setUserWorkouts(prevState => prevState.map(each => {
                    const dateArray = each.date.split('')
                    dateArray.splice(10)
                    each.date = dateArray.join('')
                    return each
                }))
            })
            .catch(err => console.log(err))
    }
    function postNewWorkout(workoutObj) {
        userAxios.post('/api/workout', workoutObj)
            .then(res => setUserWorkouts(prevState => [...prevState, res.data]))
            .catch(err => console.log(err))
    }
    function getAllUserExercises() {
        userAxios.get('/api/exercise')
            .then(res => {
                setAllUserExercises(prevState => ({
                    ...prevState,
                    objects: prevState.ids.map(each => res.data.find(exerciseObj => exerciseObj._id === each))
                }))
                setUserWorkouts(prevState => prevState.map(each => {
                    const exerciseObjs = each.exercises.map(exerciseId => res.data.find(exerciseObj => exerciseObj._id === exerciseId))
                    each.exercises = exerciseObjs
                    return each
                    }))
            })
            .catch(err => console.log(err))
    }
    function findSpecificWorkoutObj(workoutId) {
        return userWorkouts.find(workout => workout._id === workoutId)
    }
    
    
    return (
        <ProfileContext.Provider 
            value={{
                getUserWorkouts,
                setUserWorkouts,
                postNewWorkout,
                allUserExercises,
                setAllUserExercises,
                getAllUserExercises,
                findSpecificWorkoutObj,
                userWorkouts,
                deleteWorkout,
                shareWorkout
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}