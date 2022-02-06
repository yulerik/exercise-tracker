import React, { useContext, useState } from 'react'
import { ExerciseContext } from '../../context/exerciseProvider'
import { ProfileContext } from '../../context/profileProvider'

import { TrashIcon } from '@heroicons/react/solid'


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
    const repInputs = sets.length === 0 ? '' : sets.map(each => 
        <li className='grid grid-cols-8 grid-rows-3 justify-items-center gap-1'>
            <label className='col-start-1 col-end-9 row-start-1 row-end-2 self-center'>Set #{each.setNum}:</label>
            <label className='col-start-1 col-end-5 row-start-2 row-end-3'>Reps:</label>
            <input className='col-start-1 col-end-5 row-start-3 row-end-4 input input-bordered' id={each.setNum} onChange={handleReps} type='number' value={sets[(each.setNum-1)].reps}></input>
            <label className='col-start-5 col-end-9 row-start-2 row-end-3' >Weight(lbs.):</label>
            <input className='col-start-5 col-end-9 row-start-3 row-end-4 input input-bordered'  type='number' onChange={handleWeight} id={each.setNum} value={sets[(each.setNum-1)].weight}></input>
        </li>
    )
    // display state for exercises to be added to the workout
    const addedExercises = newWorkoutExercises.map(each => 
            <div className='collapse collapse-arrow w-full border rounded-box border-base-300 ' id={each._id}>
                <input type='checkbox'></input>
                <span className='collapse-title' ><h3>{each.name}</h3><h5>Sets: {each.sets.length}</h5></span>
                <ul className='collapse-content text-white' style={{listStyle: 'none'}}>
                    {each.sets.map(eachSet => <><li>reps: {eachSet.reps}</li><li style={{display: !eachSet.weight && 'none'}} >weight: {eachSet.weight}</li></>)}
                    <li>
                        <button className=''>
                            <TrashIcon className='h-5 w-5 text-red-500'/>
                        </button>
                    </li>
                </ul>
            </div>
    )
    // all previously posted exercises listed as inputs to check
    const allPostedExercises = props.props.map(each => 
        <li className='dropdown dropdown-hover cursor-pointer label carousel-item border-1 border-black text-zinc-100 '>
            <label className='btn btn-sm'>sets: {each.sets.length}</label>
            <ul className='p-2 shadow menu dropdown-content bg-base-100 rounded-box'>
                {each.sets.map(setEach => <label> reps: {setEach.reps}{setEach.weight === 0 ? '' : ` | weight: ${setEach.weight}`}</label>)}
            </ul>
            <label className='exercise-name'>{each.name}</label>
            <input className='checkbox' name='postedExercise' value={each._id} type='checkbox'></input>
        </li>
    )
    const showPostedExercisesColor = !displayState.showPostedExercises && 'bg-cyan-500 text-slate-300'

    return (
        <div  className='new-workout-form flex flex-col items-center w-full'>
            <form className='text-zinc-300 w-11/12 form-control px-6 py-2 m-2 col-start-1 col-end-3 flex flex-row items-center justify-evenly gap-2 rounded-lg border-2 border-stone-500' onChange={handleWorkoutChange} onSubmit={addWorkout} name='newWorkout' id='new-workout'> 
                <label className='text-zinc-300'>Title:</label>
                <input className='input input-bordered' name='title' type='text' value={workoutInfo.title} placeholder='i.e. leg day, chest/tri day'></input>
                <label className=''>Date:</label>
                <input className='input input-bordered' name='date' value={workoutInfo.date} type='date'></input>
                <label className=''>Duration(min):</label>
                <input className='input input-bordered w-20' name='duration' value ={workoutInfo.duration} type='number'></input>
                <ul className='text-zinc-300 flex flex-row items-center gap-2'>
                    <label name='warmUp'>warmup:</label>
                    <li className='cursor-pointer label'>
                        <input className='radio' type='radio' name='warmUp' id='true' value='true'></input>
                        <label className='px-2' htmlFor='true'>Yes</label>
                    </li>
                    <li className='cursor-pointer label'>
                        <input className='radio' type='radio' name='warmUp' id='false' value='false'></input>
                        <label className='px-2' htmlFor='false'>Next time</label>   
                    </li>
                </ul>
            </form>
            <button className='btn border-none bg-sky-500 btn-sm' /*style={{display: newWorkoutExercises.length === 0 && 'none'}}*/>Add Workout</button>
            <div className='w-full grid grid-cols-3 gap-2 justify-items-center h-full'>
                <div className='bg-indigo-400 col-start-1 col-end-2 w-10/12 rounded-lg p-2 m-2' >
                    <form className='w-full flex flex-col items-center gap-2 form-control' name='newExercise' onSubmit={addExercise} id='new-exercise'>
                        <label>select an exercise category:</label>
                        <select className='select select-bordered select-primary w-full' onChange={handleCategoryChange}>
                            <option value='' >choose category</option>
                            <option value='abs' >Abs</option>
                            <option value='arms' >Arms</option>
                            <option id='category' value='calves' >Calves</option>
                            <option value='chest' >Chest</option>
                            <option value='legs' >Legs</option>
                            <option value='shoulders' >Shoulders</option>
                        </select>
                        <select className='select select-bordered select-primary w-full' onChange={handleExerciseChange}>
                            <option>select an exercise</option>
                            {exerciseOptions}
                        </select>
                        <label className='underline underline-offset-4 tracking-widest'>Sets:</label>
                        <button className='btn btn-xs btn-primary' value='minus' onClick={handleSets}>Minus</button><p>{sets.length}</p><button className='btn btn-xs btn-primary' value='add' onClick={handleSets}>Plus</button> 
                        <ul className='text-xl tracking-wider'>
                            {repInputs}
                        </ul>
                        <button style={{display: sets.length === 0 && 'none'}}>Add Exercise</button>
                    </form>
                </div>
                <form className='bg-sky-700 w-10/12 flex flex-col items-center col-start-2 col-end-3 pb-2 mt-2 rounded-xl' style={{height: '230px'}} id='posted-exercises' name='postedExercises' onChange={handlePostedExercisesChange} onSubmit={addPostedExercises}>
                    <button className={`btn btn-outline btn-sm m-2 ${showPostedExercisesColor}`} onClick={togglePostedExercisesDisplay}>Add a previous exercise:</button>
                    <ul className='w-11/12 form-control carousel rounded-box' style={{ display: !displayState.showPostedExercises && 'none'}}>
                        {allPostedExercises}
                    </ul>
                    <button className='btn btn-xs' style={{ display: !displayState.showPostedExercises && 'none' }}>Add exercises</button>
                </form>
                <div className='col-start-3 col-end-4 row-start-1' id='added-exercises'>
                <h4>Workout Exercises</h4>
                    {addedExercises}
                </div>
            </div>
        </div>
    )
}