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

    const [userWorkouts, setUserWorkouts] = useState([])
    const [allUserExercises, setAllUserExercises] = useState(userExercisesInit)

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
            })
            .catch(err => console.log(err))
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
                userWorkouts
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}