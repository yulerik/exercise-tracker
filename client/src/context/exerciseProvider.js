import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const ExerciseContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ExerciseProvider(props){
    const initExercises = {
        userExercises: [],
        abs: [],
        arms: [],
        back: [],
        calves: [],
        chest: [],
        legs: [],
        shoulders: []
    }

    const [allExercises, setAllExercises] = useState(initExercises)
    const [newWorkoutExercises, setNewWorkoutExercises] = useState([])


    function postNewExercise(exerciseObj) {
        userAxios.post('/api/exercise', exerciseObj)
            .then(res => setNewWorkoutExercises(prevState => [...prevState, res.data]))
            .catch(err => console.log(err))
    }

    function getAllExercises() {
        userAxios.get('/api/exercise')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    userExercises: res.data
                }))
            })
            .catch(err => console.log(err))
    }
    function getAbs() {
        axios.get('https://wger.de/api/v2/exercise/?category=10&limit=54')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    abs: res.data.results
                }))
            })
            .catch(err => console.log(err))
    }
    function getArms() {
        axios.get('https://wger.de/api/v2/exercise/?category=8&limit=76')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    arms: res.data.results
                }))
            })
    }
    function getBack() {
        axios.get('https://wger.de/api/v2/exercise/?category=12&limit=72')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    back: res.data.results
                }))
            })
            .catch(err => console.log(err))
    }
    function getCalves() {
        axios.get('https://wger.de/api/v2/exercise/?category=14')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    calves: res.data.results
                }))
            })
            .catch(err => console.log(err))
    }
    function getChest() {
        axios.get('https://wger.de/api/v2/exercise/?category=11&limit=58')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    chest: res.data.results
                }))
            })
    }
    function getLegs() {
        axios.get('https://wger.de/api/v2/exercise/?category=9&limit=86')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    legs: res.data.results
                }))
            })
    }
    function getShoulders() {
        axios.get('https://wger.de/api/v2/exercise/?category=13&limit=61')
            .then(res => {
                setAllExercises(prevState => ({
                    ...prevState,
                    shoulders: res.data.results
                }))
            })
    }

    useEffect(() => {
        getAbs()
        getArms()
        getBack()
        getCalves()
        getChest()
        getLegs()
        getShoulders()
    }, [])

    return (
        <ExerciseContext.Provider
          value={{
              ...allExercises,
              postNewExercise,
              getAllExercises,
              setNewWorkoutExercises,
              newWorkoutExercises
        }}>
            { props.children }
        </ExerciseContext.Provider>
    )
}