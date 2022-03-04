import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'


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

    const [userWorkouts, setUserWorkouts] = useState([])
    const [allUserExercises, setAllUserExercises] = useState(userExercisesInit)
    const [sortUserWorkouts, setSortUserWorkouts] = useState([])
    // sort user workouts
    function handleUserWorkoutsSort(event) {
        const { value } = event.target
        if (value === 'most-exercises') {
            setSortUserWorkouts(prevState => userWorkouts.sort((a, b) => {return b.exercises.length - a.exercises.length}))
        } else if (value === 'least-exercises') {
            setSortUserWorkouts(prevState => userWorkouts.sort((a, b) => {return a.exercises.length - b.exercises.length}))
        } else if (value === 'shared') {
            setSortUserWorkouts(prevState => userWorkouts.filter(each => each.shared.isShared))
        } else if (value === 'private') {
            setSortUserWorkouts(prevState => userWorkouts.filter(each => !each.shared.isShared))
        } 
    }
    // get a specific workout
    const getWorkout = async (workoutId) => {
        const workout = await userAxios.get(`/api/workout/${workoutId}`)
        return workout.data
    }
    // share a workout
    function shareWorkout(workoutId) {
        userAxios.post('/api/workout/shared', {"sharedWorkout": workoutId})
            .then(res => {
                // setUserWorkouts(prevState => [...prevState, res.data])
                getUserWorkouts()
            })
            .catch((err) => console.log(err))
    }
    // delete a workout
    function deleteWorkout(workoutId) {
        userAxios.delete(`/api/workout/${workoutId}`)
            .then(res => setUserWorkouts(prevState => prevState.filter(each => each._id !== res.data._id)))
            .catch(err => console.log(err))
    }
    // get all user workouts
    function getUserWorkouts() {
        userAxios.get('/api/workout/')
            .then(res => {
                getAllUserExercises()
                const allExercises = []
                // takes all exercises ids into one array
                res.data.map(each =>   allExercises.push(...each.exercises))
                // 
                setUserWorkouts(prevState => res.data)
                setAllUserExercises(prevState => ({
                    ...prevState, 
                    ids: allExercises
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
    // get both workouts and exercises
    const getWorkoutsExercises = async () => {
        const getExercises = await userAxios.get('/api/exercise').then(res => {
            setAllUserExercises(prevState => ({
                ...prevState,
                objects: res.data,
                ids: res.data.map(each => each._id)
            }))
            return res  
        })
        const getWorkouts = await userAxios.get('/api/workout').then(res => {
            res.data.map(eachWorkout => {
                const exerciseObj = eachWorkout.exercises.map(exerciseId => {
                    return getExercises.data.find(exerciseObj => exerciseObj._id === exerciseId)
                })
                eachWorkout.exercises = exerciseObj
                const dateArray = eachWorkout.date.split('')
                dateArray.splice(10)
                eachWorkout.date = dateArray.join('')
                return eachWorkout
            })
            setUserWorkouts(res.data)
        })
    }
    // post a new workout
    function postNewWorkout(workoutObj) {
        userAxios.post('/api/workout', workoutObj)
            .then(res => {
                // setUserWorkouts(prevState => [...prevState, res.data])
                getWorkoutsExercises()
            })
            .catch(err => console.log(err))
    }
    // get user exercises
    function getAllUserExercises() {
        userAxios.get('/api/exercise')
            .then(res => {
                setAllUserExercises(prevState => ({
                    ...prevState,
                    objects: res.data,
                    ids: res.data.map(each => each._id)
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
                sortUserWorkouts,
                handleUserWorkoutsSort,
                getWorkout,
                getWorkoutsExercises,
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