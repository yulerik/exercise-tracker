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

    const [userWorkouts, setUserWorkouts] = useState([])

    function getUserWorkouts() {
        userAxios.get('/api/workout/')
            .then(res => setUserWorkouts(prevState => [...prevState, ...res.data]))
            .catch(err => console.log(err))
    }
    function postNewWorkout(workoutObj) {
        userAxios.post('/api/workout', workoutObj)
            .then(res => setUserWorkouts(prevState => [...prevState, res.data]))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserWorkouts()
    }, [])
    
    return (
        <ProfileContext.Provider 
            value={{
                getUserWorkouts,
                setUserWorkouts,
                postNewWorkout,
                userWorkouts
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}