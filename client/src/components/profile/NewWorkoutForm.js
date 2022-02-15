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
    const { postNewWorkout, allUserExercises, getUserWorkouts, getWorkoutsExercises } = useContext(ProfileContext)
    // init objects for exer/workout
    const exerciseInit = {
        name: '',
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
    const [displayState, setDisplayState] = useState({ showPostedExercises: false, showNewExerciseForm: false })
    // handle display for new form exercise
    function handleNewExerciseDisplay(event) {
        event.preventDefault()
        setDisplayState(prevState => ({
            ...prevState,
            showNewExerciseForm: !prevState.showNewExerciseForm
        }))
    }
    // updates exercise category with each change, 
    // update category list with all exercises for selected category
    function handleCategoryChange(event) {
        const { value } = event.target
        if (value === 'abs') {
            setCategory(prevState => ({ category: abs }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'abs',
                    id: 10
                }
            }))
        }
        else if (value === 'arms') {
            setCategory(prevState => ({ category: arms }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'arms',
                    id: 8
                }
            }))
        }
        else if (value === 'back') {
            setCategory(prevState => ({ category: back }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'back',
                    id: 12
                }
            }))
        }
        else if (value === 'calves') {
            setCategory(prevState => ({ category: calves }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'calves',
                    id: 14
                }
            }))
        }
        else if (value === 'chest') {
            setCategory(prevState => ({ category: chest }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'chest',
                    id: 11
                }
            }))
        }
        else if (value === 'legs') {
            setCategory(prevState => ({ category: legs }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'legs',
                    id: 9
                }
            }))
        }
        else if (value === 'shoulders') {
            setCategory(prevState => ({ category: shoulders }))
            setExercise(prevState => ({
                ...prevState,
                category: {
                    title: 'shoulders',
                    id: 13
                }
            }))
        }
    }
    // updates state with exercise change event for weights category
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
        const { value, id } = event.target
        setSets(prevState => {
            prevState[id - 1].reps = Number(value)
            return [...prevState]
        })
    }
    // updates state for weight change
    function handleWeight(event) {
        const { value, id } = event.target
        setSets(prevState => {
            prevState[id - 1].weight = Number(value)
            return [...prevState]
        })
    }
    // posts new exercise to db, adds exercise to list of new workout exercises
    function addExercise(event) {
        event.preventDefault()
        const newExercise = {
            ...exercise,
            sets: [...sets]
        }
        postNewExercise(newExercise)
        setSets([])
        setCategory({ category: [] })
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
        // getUserWorkouts()
    }
    // adds previously posted exercise to current new exercises for workout
    function addPostedExercises(event) {
        event.preventDefault()
        console.log(event)
        setNewWorkoutExercises(prevState => [...prevState, ...postedExercises])
        setPostedExercises([])
    }
    // updates state when checkboxs checked/unchecked
    function handlePostedExercisesChange(event) {
        const { value, checked } = event.target
        if (checked) {
            const exerciseObj = allUserExercises.objects.find(each => each._id === value)
            console.log(exerciseObj)
            setPostedExercises(prevState => [...prevState, exerciseObj])
            setWorkoutInfo(prevState => ({ ...prevState, exercises: [...prevState.exercises, value] }))
        }
        else if (!checked) {
            setPostedExercises(prevState => prevState.filter(each => each._id !== value))
            setWorkoutInfo(prevState => ({
                ...prevState,
                exercises: prevState.exercises.filter(each => each !== value)
            }))
        }
        console.log(value, checked)
    }
    // updates state for every change of workout
    function handleWorkoutChange(event) {
        const { value, name } = event.target
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

    const formSpan = 'relative z-0 w-3/12 mb-6 group '
    const formInput = 'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer'
    const formLabel = 'absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'

    return (
        <div className='new-workout-form flex flex-col items-center w-full'>
            <form
                className='w-full m-2 flex flex-col'
                onChange={handleWorkoutChange} onSubmit={addWorkout} name='newWorkout' id='new-workout'
            >   
                <div className='w-full m-2 border-b flex justify-evenly gap-4'>

                    <span className={formSpan}>
                        <input className={formInput} name='title' type='text' value={workoutInfo.title} onChange={handleWorkoutChange} placeholder=' ' required ></input>
                        <label htmlFor='name' className={formLabel}>Title:</label>
                    </span>
                    <span className={formSpan}>
                        <input className={formInput} name='date' value={workoutInfo.date} onChange={handleWorkoutChange} type='date' placeholder=' ' required ></input>
                        <label className={formLabel} htmlFor='date'>Date:</label>
                    </span>
                    <span className={formSpan}>
                        <input className={formInput} name='duration' value={workoutInfo.duration} onChange={handleWorkoutChange} type='number' placeholder=' ' required ></input>
                        <label className={formLabel} htmlFor='duration'>Duration(min):</label>
                    </span>
                    <ul className=''>
                        <label name='warmUp'>warmup:</label>
                        <li className=''>
                            <input className='' type='radio' name='warmUp' id='true' value='true'></input>
                            <label className='px-2' htmlFor='true'>Yes</label>
                        </li>
                        <li className=''>
                            <input className='' type='radio' name='warmUp' id='false' value='false'></input>
                            <label className='px-2' htmlFor='false'>Next time</label>
                        </li>
                    </ul>
                </div>
                <button 
                    className='self-center text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    >
                    Add Workout
                </button>
            </form>
            <div className='w-full grid grid-cols-2 gap-2 justify-items-center h-full'>
                <div className='col-start-1 col-end-2 flex flex-col items-center w-full p-2'>
                    <form 
                        className='bg-sky-700 w-10/12 flex flex-col items-center col-start-2 col-end-3 pb-2 mt-2 rounded-xl' 
                        style={{ height: '230px' }} 
                        id='posted-exercises' 
                        name='postedExercises' 
                        onChange={handlePostedExercisesChange}
                        onSubmit={addPostedExercises}>
                        <button 
                            className='btn btn-outline text-sky-400 hover:bg-sky-500 hover:text-slate-700 hover:border-sky-300 focus:ring-4 focus:ring-sky-700'
                            onClick={togglePostedExercisesDisplay}
                            >
                            Add a previous exercise:
                        </button>
                        <ul 
                            className='w-11/12 form-control carousel rounded-box' 
                            style={{ display: !displayState.showPostedExercises && 'none' }}
                            >
                            {allUserExercises.objects.map(each =>
                            <li 
                                key={each._id} 
                                className='dropdown dropdown-hover cursor-pointer label carousel-item border-1 border-black text-zinc-100 '
                                >
                                <label className='btn btn-sm'>sets: {each.sets.length}</label>
                                <ul className='p-2 shadow menu dropdown-content bg-base-100 rounded-box'>
                                    {each.sets.map(setEach => 
                                        <label 
                                        key={`sets-${setEach._id}`}
                                        > 
                                        reps: {setEach.reps}{setEach.weight === 0 ? '' : ` | weight: ${setEach.weight}`}
                                        </label>
                                    )}
                                </ul>
                                <label className='exercise-name'>{each.name}</label>
                                <input className='checkbox' name='postedExercise' value={each._id} type='checkbox'></input>
                            </li>
                            )}
                        </ul>
                        <button 
                            className='btn btn-xs' 
                            style={{ display: !displayState.showPostedExercises && 'none' }}
                            >
                            Add exercises
                        </button>
                    </form>
                    {/* <form
                        className='w-full flex flex-col items-center'
                        id='posted-exercises'
                        name='postedExercises'
                        onChange={handlePostedExercisesChange}
                        onSubmit={addPostedExercises}>
                        <button
                            className='btn btn-outline text-sky-400 hover:bg-sky-500 hover:text-slate-700 hover:border-sky-300 focus:ring-4 focus:ring-sky-700'
                            onClick={togglePostedExercisesDisplay}
                            >
                            Add a previous exercise:
                        </button>
                        <select 
                            className='bg-neutral m-2 p-2 rounded-xl w-11/12' 
                            onChange={handlePostedExercisesChange}
                            style={{ display: !displayState.showPostedExercises && 'none', overflowY: 'auto' }} 
                            >
                            {allUserExercises.objects.map(exerciseObj => 
                                <option key={exerciseObj._id} value= className='h-16'>
                                    {exerciseObj.name} | sets: {exerciseObj.sets.length}
                                </option>
                            )}
                        </select>
                        <button className='btn btn-xs' style={{ display: !displayState.showPostedExercises && 'none' }}>Add exercises</button>
                    </form> */}
                    <div className='w-full text-center rounded-lg p-2 m-2' >
                        <button 
                            onClick={handleNewExerciseDisplay}
                            className='text-purple-700 hover:text-slate-800 border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400  dark:hover:bg-purple-500 dark:focus:ring-purple-900'>
                                Add a new exercise
                        </button>
                        <form 
                            style={{display: !displayState.showNewExerciseForm && 'none'}} 
                            className='w-full flex flex-col items-center gap-2' 
                            name='newExercise' 
                            onSubmit={addExercise} 
                            id='new-exercise'
                            >
                            <select 
                                className='select select-bordered border-sky-600 w-full' 
                                onChange={handleCategoryChange}
                                >
                                    <option value='' >choose category</option>
                                    <option value='abs' >Abs</option>
                                    <option value='arms' >Arms</option>
                                    <option value='calves' >Calves</option>
                                    <option value='chest' >Chest</option>
                                    <option value='legs' >Legs</option>
                                    <option value='shoulders' >Shoulders</option>
                                </select>
                            <select className='select select-bordered border-sky-600 w-full' onChange={handleExerciseChange}>
                                <option>select an exercise</option>
                                    {category.category.map(each =>
                                        <option value={each.uuid}>
                                            {each.name}
                                        </option>
                                    )}
                            </select>
                            <label className='underline underline-offset-4 tracking-widest'>Sets:</label>
                            <span className='flex flex-row w-10/12 justify-evenly items-center'>
                                <button className='btn btn-xs btn-error' value='minus' onClick={handleSets}>Minus</button>
                                <p className='alert alert-info'>{sets.length}</p>
                                <button className='btn btn-xs btn-success' value='add' onClick={handleSets}>Plus</button>
                            </span>
                            <ul className='text-xl tracking-wider w-full m-2'>
                                {sets.length === 0 ? '' : sets.map(each => 
                                        <li className='flex gap-2 w-11/12 justify-evenly' key={sets._id}>
                                            <label className='badge'>Set #{each.setNum}:</label>
                                            <span className={formSpan} >
                                                <input className={formInput} id={each.setNum} name='rep' onChange={handleReps} type='number' value={sets[(each.setNum - 1)].reps}></input>
                                                <label className={formLabel} htmlFor='rep'>Reps:</label>
                                            </span>
                                            <span className={formSpan} >
                                                <input className={formInput} type='number' name='weight' onChange={handleWeight} id={each.setNum} value={sets[(each.setNum - 1)].weight} placholder=' ' ></input>
                                                <label className={formLabel} htmlFor='weight'>Weight(lbs.):</label>
                                            </span>
                                        </li>
                                    )
                                }
                            </ul>
                            <button style={{ display: sets.length === 0 && 'none' }}>Add Exercise</button>
                        </form>
                    </div>
                </div>
                <div className='col-start-2 col-end-3 row-start-1' id='added-exercises'>
                    <h4>Workout Exercises</h4>
                    {newWorkoutExercises.map(each =>
                        <div className='collapse collapse-arrow w-full border rounded-box border-base-300 ' id={each._id}>
                            <input type='checkbox'></input>
                            <span className='collapse-title' ><h3>{each.name}</h3><h5>Sets: {each.sets.length}</h5></span>
                            <ul className='collapse-content text-white' style={{ listStyle: 'none' }}>
                                {each.sets.map(eachSet => <li key={`newW-${eachSet._id}`}><li>reps: {eachSet.reps}</li><li style={{ display: !eachSet.weight && 'none' }} >weight: {eachSet.weight}</li></li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}