import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/outline'
import { ForumContext } from '../../context/forumProvider'


export default function ForumAll(props) {
    const { handleQuestionSubmit, handleQuestionChange, questionInputs : { question, category, subcategory }, questions, renderForumProvider, setForum } = useContext(ForumContext)
    // displays options for current input of category

    const [postedQuestions, setPostedQuestions] = useState([])

    function handleFilter(event) {
        const { value, name, checked } = event.target  
        if (value == 'most-commented') {
            setForum(prevState => ({
                ...prevState,
                questions: prevState.questions.sort((a, b) => {return b.comments.length - a.comments.length})
            }))
            console.log(value)
        }
        else if (value == 'least-commented') {
            setForum(prevState => ({
                ...prevState,
                questions: prevState.questions.sort((a, b) => {return a.comments.length - b.comments.length})
            }))
            console.log(value)
        }
        else if (value == 'most-liked') {
            setForum(prevState => ({
                ...prevState,
                questions: prevState.questions.sort((a, b) => {return b.likes.length - a.likes.length})
            }))
            console.log(value)
        }
        else if (value == 'least-liked') {
            setForum(prevState => ({
                ...prevState,
                questions: prevState.questions.sort((a, b) => {return a.likes.length - b.likes.length})
            }))
            console.log(value)
        }
    }

    function subCategoryInputs(category) {
        const weightSubCategories = ['abs', 'arms', 'calves', 'chest', 'legs', 'shoulders']
        const cardioSubCategories = ['running', 'biking', 'hiking', 'walking', 'stairs', 'swimming', 'rowing']
        if (category === 'weights') return weightSubCategories.map(each => <option key={each} name='subcategory' value={each}>{each}</option>)
        else if (category === 'cardio') return cardioSubCategories.map(each => <option key={each} name='subcategory' value={each}>{each}</option>)
        return
    }

    let displayQuestions = questions.length === 0 ? 'no questions, be the first to ask a question' : questions.map(each => 
        <div 
            className='hover:opacity-75 carousel-item text-stone-300 flex flex-col items-center justify-between w-80 border-solid border-2 border-zinc-600 bg-neutral rounded-xl p-2.5'
            key={each._id} 
            >
            <span 
                className='flex flex-row items-center justify-between w-full gap-2'
                >
                <span className='flex flex-row items-center gap-1'>
                    <span 
                        className='bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900'
                        >
                        {each.category}
                    </span>
                    <span 
                        className='bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2 rounded dark:bg-pink-200 dark:text-pink-900'
                        >
                        {each.subcategory}
                    </span>
                </span>
                <h4 className='flex flex-row items-center gap-1 text-sky-200'>
                    <UserCircleIcon className='h-4 w-4 text-sky-400'/> 
                    {each.username}
                </h4>
            </span>
            <h1>{each.question}</h1>
            <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row gap-1 w-full items-center justify-between m-1'>
                    <span className='flex flex-row badge badge-outline text-emerald-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <h3>{each.likes.length}</h3>
                    </span>
                    <span className='flex flex-row gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <h3>{each.comments.length}</h3>
                    </span>
                    <button 
                        className='btn btn-xs btn-outline bg-emerald-400 text-slate-700 border-emerald-600 hover:bg-neutral hover:border-emerald-400 hover:text-emerald-400'
                        >
                        <Link to={`/forum/${each._id}`} state={each} className='' >
                            View
                        </Link>
                    </button>
                </div>
            </div>
            
        </div>
    )

    useEffect(() => {
        setPostedQuestions(questions)
        renderForumProvider()
    },[])

    return (
        <>
            <h1>Forum All</h1>
            <form onSubmit={handleQuestionSubmit} className='text-zinc-300 w-11/12 form-control p-4 m-4 gap-4 rounded-lg border-2 border-stone-500 grid grid-cols-2' onChange={handleQuestionChange}>
                <span className='flex flex-col gap-2 items-center p-2'>
                    <label className='label-text'>Ask a Question:</label>
                    <textarea className='w-11/12 h-full textarea textarea-bordered focus:border-emerald-400' name='question' onChange={handleQuestionChange} value={question}></textarea>
                </span>
                <span className='flex flex-col p-1 gap-2'>
                    <label><span className='bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900'>Category:</span></label>
                    <select className='select select-bordered focus:border-emerald-400' name='category'>    
                            <option name='category' value=''>Other</option>
                            <option name='category' value='cardio'>Cardio</option>
                            <option name='category' value='weights'>Weights</option>
                    </select>
                    <label><span className='bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2 rounded dark:bg-pink-200 dark:text-pink-900'>subcategory:</span></label>
                    <select className='select select-bordered focus:border-emerald-400' name='subcategory'> 
                        <option name='subcategory' value=''>other</option>
                        {subCategoryInputs(category)}
                    </select>
                    <button className='btn btn-outline btn-sm text-emerald-400 hover:bg-emerald-400 hover:border-emerald-400'>Submit Question</button>
                </span>
            </form>
            <form onChange={handleFilter} className='form-control flex-row items-center gap-2'>
                <span>
                    <label>Sort by:</label>
                </span>
                <span>
                    <input type='radio' className='form-input text-blue-400' value='most-commented' id='most-commented' name='filters'></input>
                    <label htmlFor='most-commented'>Most Commented</label>
                </span>   
                <span>
                    <input type='radio' className='' value='least-commented' id='least-commented' name='filters'></input>
                    <label htmlFor='least-commented'>Least Commented</label>                
                </span>
                <span>
                    <input type='radio' className='' value='most-liked' id='most-liked' name='filters'></input>
                    <label htmlFor='most-liked'>Most Liked</label>
                </span>
                <span>
                    <input type='radio' className='' value='least-liked' id='least-liked' name='filters'></input>
                    <label htmlFor='least-liked'>Least Liked</label>
                </span>
            </form>
            <div className='all-questions carousel carousel-center gap-2 bg-neutral rounded-box w-11/12 mt-4 p-2 h-64'>
                {displayQuestions}
            </div>
        </>
    )
}