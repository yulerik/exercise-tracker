import React, { useContext, useState } from 'react'
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
        setNewWorkoutExercises
     } = useContext(ExerciseContext)
     const { postNewWorkout } = useContext(ProfileContext)
    // init objects for exer/workout
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
        title: '',
        date: '',
        duration: 0,
        warmUp: false,  
        exercises: []
    }
    // state
    const [category, setCategory] = useState({ category: [] })
    const [exercise, setExercise] = useState(exerciseInit)
    const [sets, setSets] = useState([])
    const [postedExercises, setPostedExercises] = useState([])
    const [workoutInfo, setWorkoutInfo] = useState(workoutInit)
    const [displayState, setDisplayState] = useState({showPostedExercises: false})
    // updates exercise category with each change, 
    // update category list with all exercises for selected category
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
    // updates state with exercise change event
    function handleExerciseChange(event) {
        const { value } = event.target
        const exerciseObj = category.category.find(each => each.uuid === value)
        setExercise(prevState => ({
            ...prevState,
            name: exerciseObj.name,
            id: value,
            desc: exerciseObj.description
        }))
    }
    // updates state to add new rep obj for change of set #
    function handleSets(event) {
        event.preventDefault()
        const { value } = event.target
        // add new rep obj to sets
        if (value === 'add') setSets(prevState => [...prevState, { reps: 0, setNum: prevState.length + 1, weight: 0 }])
        // filter out last setNum when equal to length of array
        else if (value === 'minus') setSets(prevState => prevState.filter(each => each.setNum !== prevState.length))
    }
    // updates state for rep # change
    function handleReps(event) {
        const {value, id} = event.target
        setSets(prevState => {
            prevState[id-1].reps = Number(value)
            return [...prevState]
        })
    }
    // updates state for weight change
    function handleWeight(event) {
        const {value, id} = event.target
        setSets(prevState => {
            prevState[id-1].weight = Number(value)
            return [...prevState]
        })
    }
    // posts new exercise to db, adds exercise to list of new workout exercises
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
        // clear all inputs and values to defaults
        setWorkoutInfo(workoutInit)
        setPostedExercises([])
        setSets([])
        setCategory({ category: [] })
        setExercise(exerciseInit)
        setDisplayState({ showPostedExercises: false })
        setNewWorkoutExercises([])
        
    }
    // adds previously posted exercise to current new exercises for workout
    function addPostedExercises(event) {
        event.preventDefault()
        setNewWorkoutExercises(prevState => [...prevState, ...postedExercises])
        setPostedExercises([])
    }
    // updates state when checkboxs checked/unchecked
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
    // updates state for every change of workout
    function handleWorkoutChange(event) {
        const {value, name} = event.target
        setWorkoutInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    // shows/hides all posted exercises on click
    function togglePostedExercisesDisplay(event) {
        event.preventDefault()
        setDisplayState(prevState => ({
            ...prevState,
            showPostedExercises: !prevState.showPostedExercises
        }))
    }
    // populate each option with current category of exercises
    const exerciseOptions = category.category.map(each => 
        <option value={each.uuid}>
            {each.name}
        </option>
    )
    // adds rep form input for each added set   
    const repInputs = sets.length === 0 ? 'add a set' : sets.map(each => 
        <>
            <label>Set #{each.setNum}:</label>
            <label>Reps:</label>
            <input id={each.setNum} onChange={handleReps} type='number' value={sets[(each.setNum-1)].reps}></input>
            <label>Weight(lbs.): (0 if n/a)</label>
            <input type='number' onChange={handleWeight} id={each.setNum} value={sets[(each.setNum-1)].weight}></input>
        </>
    )
    // display state for exercises to be added to the workout
    const addedExercises = newWorkoutExercises.map(each => 
        <div id={each._id}>
            <h3>{each.name}</h3>
            <ul style={{listStyle: 'none'}}>sets: {each.sets.length}
                {each.sets.map(eachSet => <><li>reps: {eachSet.reps}</li><li style={{display: !eachSet.weight && 'none'}} >weight: {eachSet.weight}</li><hr></hr></>)}
            </ul>
        </div>
    )
    // all previously posted exercises listed as inputs to check
    const allPostedExercises = props.props.map(each => 
        <li>
            <input name='postedExercise' value={each._id} type='checkbox'></input>
            <label className='exercise-name'>{each.name}</label>
            <br></br>
            {each.sets.map(setEach => <label> reps: {setEach.reps} | weight: {setEach.weight}) <br></br></label>)}
        </li>
    )

    return (
        <div className='new-workout-form'>
            <form onChange={handleWorkoutChange} onSubmit={addWorkout} name='newWorkout' id='new-workout'> 
                <label>Title:</label>
                <input name='title' type='text' value={workoutInfo.title}></input>
                <label>Date:</label>
                <input name='date' value={workoutInfo.date} type='date'></input>
                <label>Duration(minutes):</label>
                <input name='duration' value ={workoutInfo.duration} type='number'></input>
                <ul>
                    <label name='warmUp'>warmup:</label>
                    <li>
                        <input type='radio' name='warmUp' id='true' value='true'></input>
                        <label htmlFor='true'>Yes</label>
                    </li>
                    <li>
                        <input type='radio' name='warmUp' id='false' value='false'></input>
                        <label htmlFor='false'>Next time</label>   
                    </li>
                </ul>
                <button style={{display: newWorkoutExercises.length === 0 && 'none'}}>Add Workout</button>
            </form>
            <form style={{height: '230px'}} id='posted-exercises' name='postedExercises' onChange={handlePostedExercisesChange} onSubmit={addPostedExercises}>
                <button onClick={togglePostedExercisesDisplay}>Add a previous exercise:</button>
                <ul style={{ display: !displayState.showPostedExercises && 'none', width: '180px', height: 'auto', overflow: 'auto' }}>
                    {allPostedExercises}
                </ul>
                <button style={{ display: !displayState.showPostedExercises && 'none' }}>Add exercises</button>
            </form>
            <form name='newExercise' onSubmit={addExercise} id='new-exercise'>
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
                <button style={{display: sets.length === 0 && 'none'}}>Add Exercise</button>
            </form>
            <div id='added-exercises'>
                {addedExercises}
            </div>
        </div>
    )
}