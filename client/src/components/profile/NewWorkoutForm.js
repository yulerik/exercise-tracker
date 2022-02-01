import React, { useContext, useEffect, useState } from 'react'
import { ExerciseContext } from '../../context/exerciseProvider'
import { ProfileContext } from '../../context/profileProvider'



export default function NewWorkoutForm(props) {
    const {
        abs,
        arms,
        back,
        calves,
        chest,
        legs,
        shoulders,
        postNewExercise,
        newWorkoutExercises,
        setNewWorkoutExercises,
        userExercises,
        getAllExercises
     } = useContext(ExerciseContext)
     const { postNewWorkout } = useContext(ProfileContext)
    
    const exerciseInit = {
        name : '',
        id: '',
        desc: '',
        category: {
            title: '',
            id: ''
        }
    }
    const workoutInit = {
        date: '',
        duration: 0,
        warmUp: false,
        exercises: []
    }

    const [category, setCategory] = useState({category: []})
    const [exercise, setExercise] = useState(exerciseInit)
    const [sets, setSets] = useState([])
    const [postedExercises, setPostedExercises] = useState([])
    const [workoutInfo, setWorkoutInfo] = useState(workoutInit)

    function handleCategoryChange(event) {
        const {value} = event.target
        if (value === 'abs') {
            setCategory(prevState => ({ category: abs }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'abs',
                    id: 10
                }
            }))
        } 
        else if(value === 'arms') {
            setCategory(prevState => ({ category: arms }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'arms',
                    id: 8
                }
            }))
        } 
        else if(value === 'back') {
            setCategory(prevState => ({ category: back }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'back',
                    id: 12
                }
            }))
        } 
        else if(value === 'calves') {
            setCategory(prevState => ({ category: calves }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'calves',
                    id: 14
                }
            }))
        } 
        else if(value === 'chest') {
            setCategory(prevState => ({ category: chest }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'chest',
                    id: 11
                }
            }))
        } 
        else if(value === 'legs') {
            setCategory(prevState => ({ category: legs }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'legs',
                    id: 9
                }
            }))
        } 
        else if(value === 'shoulders') {
            setCategory(prevState => ({ category: shoulders }))
            setExercise(prevState => ({
                ...prevState,
                category : {
                    title: 'shoulders',
                    id: 13
                }
            }))
        } 
    }
    function handleExerciseChange(event) {
        const { value, textContent } = event.target
        console.log(value)
        const exerciseObj = category.category.find(each => each.uuid === value)
        setExercise(prevState => ({
            ...prevState,
            name: exerciseObj.name,
            id: value,
            desc: exerciseObj.description
        }))
    }
    const exerciseOptions = category.category.map(each => 
            <option value={each.uuid}>
                {each.name}
            </option>
    )
    function handleSets(event) {
        event.preventDefault()
        const { value } = event.target
        // add new rep obj to sets
        if (value === 'add') setSets(prevState => [...prevState, { reps: 0, setNum: prevState.length + 1, weight: 0 }])
        // filter out last setNum when equal to length of array
        else if (value === 'minus') setSets(prevState => prevState.filter(each => each.setNum !== prevState.length))
    }
    function handleReps(event) {
        const {value, id} = event.target
        setSets(prevState => {
            prevState[id-1].reps = Number(value)
            return [...prevState]
        })
    }
    function handleWeight(event) {
        const {value, id} = event.target
        setSets(prevState => {
            prevState[id-1].weight = Number(value)
            return [...prevState]
        })
    }
    function addExercise(event) {
        event.preventDefault()

        const newExercise = {
            ...exercise,
            sets
        }
        postNewExercise(newExercise)
        setExercise(exerciseInit)
        setSets([])
        setCategory({category: []})
    }
    function addWorkout(event) {
        event.preventDefault()
        postNewWorkout(workoutInfo)
        setWorkoutInfo(workoutInit)
    }
    function addPostedExercises(event) {
        event.preventDefault()
        setNewWorkoutExercises(prevState => [...prevState, ...postedExercises])
        setPostedExercises([])
    }
    function handlePostedExercisesChange(event) {
        const {value, checked} = event.target
        if (checked) {
            const exerciseObj = props.props.find(each => each._id === value)
            setPostedExercises(prevState => [...prevState, exerciseObj])
            setWorkoutInfo(prevState => ({...prevState, exercises: [...prevState.exercises, value]}))
        } 
        else if (!checked) {
            setPostedExercises(prevState => prevState.filter(each => each._id !== value))
            setWorkoutInfo(prevState => ({
                ...prevState,
                exercises: prevState.exercises.filter(each => each !== value)
            }))
        }

    }
    function handleWorkoutChange(event) {
        const {value, name} = event.target
        setWorkoutInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const repInputs = sets.length === 0 ? 'add a set' : sets.map(each => 
        <>
            <label>Set #{each.setNum}:</label>
            <label>Reps:</label>
            <input id={each.setNum} onChange={handleReps} type='number' value={sets[(each.setNum-1)].reps}></input>
            <label>Weight(lbs.): (0 if n/a)</label>
            <input type='number' onChange={handleWeight} id={each.setNum} value={sets[(each.setNum-1)].weight}></input>
        </>
    )
    const addedExercises = newWorkoutExercises.map(each => 
            <div id={each._id}>
                <h3>{each.name}</h3>
                <ul style={{textDecoration: 'none'}}>sets: {each.sets.length}
                    {each.sets.map(eachSet => <li>reps: {eachSet.reps}<br></br>weight: {eachSet.weight}</li>)}
                </ul>
            </div>
        )
    let allPostedExercises = props.props.map(each => 
        <>
            <input name='postedExercise' value={each._id} type='checkbox'></input>
            <label>{each.name}</label>
            {each.sets.map(setEach => <label> ({setEach.reps}: {setEach.weight}) |</label>)}
        </>
    )
    
    useEffect(() => {
        getAllExercises()
    }, [])

    return (
        <>
            <form onChange={handleWorkoutChange} onSubmit={addWorkout} id='new-workout'> 
                <label>Date:</label>
                <input name='date' value={workoutInfo.date} type='date'></input>
                <label>Duration(minutes):</label>
                <input name='duration' value ={workoutInfo.duration} type='number'></input>
                <label name='warmUp'>warmup:</label>
                <input type='radio' name='warmUp' id='true' value='true'></input>
                <label htmlFor='true'>Yes</label>
                <input type='radio' name='warmUp' id='false' value='false'></input>
                <label htmlFor='false'>Next time</label>
                <button style={{display: newWorkoutExercises.length === 0 && 'none'}}>Add Workout</button>
            </form>
            <form name='postedExercises' onChange={handlePostedExercisesChange} onSubmit={addPostedExercises}>
                <label>Add a previous exercise:</label>
                <ul>
                    {allPostedExercises}
                </ul>
                <button>Add exercises</button>
            </form>
            {addedExercises}
            <form onSubmit={addExercise} id='new-exercise'>
                <label>select an exercise category:</label>
                <select onChange={handleCategoryChange}>
                    <option value='' >choose category</option>
                    <option value='abs' >Abs</option>
                    <option value='arms' >Arms</option>
                    <option id='category' value='calves' >Calves</option>
                    <option value='chest' >Chest</option>
                    <option value='legs' >Legs</option>
                    <option value='shoulders' >Shoulders</option>
                </select>
                <select onChange={handleExerciseChange}>
                    <option>select an exercise</option>
                    {exerciseOptions}
                </select>
                <label>Sets:</label>
                <button value='minus' onClick={handleSets}>Minus</button><p>{sets.length}</p><button value='add' onClick={handleSets}>Plus</button> 
                {repInputs}
                <button>Add Exercise</button>
            </form>
        </>
    )
}