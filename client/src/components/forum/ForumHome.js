import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/solid'


export default function ForumHome(props) {
    const { handleQuestionSubmit, handleQuestionChange, questionInputs : { question, category, subcategory }, questions } = props
    // displays options for current input of category
    function subCategoryInputs(category) {
        const weightSubCategories = ['abs', 'arms', 'calves', 'chest', 'legs', 'shoulders']
        const cardioSubCategories = ['running', 'biking', 'hiking', 'walking', 'stairs', 'swimming', 'rowing']
        if (category === 'weights') return weightSubCategories.map(each => <option key={each} value={each}>{each}</option>)
        else if (category === 'cardio') return cardioSubCategories.map(each => <option key={each} value={each}>{each}</option>)
        return
    }
    const displayQuestions = questions.map(each => 
        <div key={each._id} className='carousel-item text-stone-300 flex flex-col items-center justify-between w-4/12 h-20 border-solid border-2 border-black bg-stone-800 rounded-xl p-2'>
            <h1>{each.question}</h1>
            <span className='flex flex-row items-center justify-around w-full'>
                <span className='badge text-violet-300'>{each.category}</span>
                <span className='badge text-violet-400'>{each.subcategory}</span>
                <Link to={`/forum/${each._id}`} state={each}>
                    <button className='btn btn-xs text-emerald-400 hover:bg-emerald-400 hover:text-slate-700'>view</button>
                </Link>
            </span>
        </div>
    )

    return (
        <>
            <h1>Forum Home</h1>
            <form onSubmit={handleQuestionSubmit} className='text-zinc-300 w-11/12 form-control px-6 py-2 m-2 gap-4 rounded-lg border-2 border-stone-500 grid grid-cols-2' onChange={handleQuestionChange}>
                <span className='flex flex-col gap-2 items-center p-2'>
                    <label className='label-text'>Question:</label>
                    <textarea className='w-11/12 h-full textarea textarea-bordered focus:border-emerald-400' name='question' onChange={handleQuestionChange} value={question}></textarea>
                </span>
                <span className='flex flex-col p-1 gap-2'>
                    <label>Category:</label>
                    <select className='select select-bordered focus:border-emerald-400' name='category'>    
                            <option name='category' value=''>Other</option>
                            <option name='category' value='cardio'>Cardio</option>
                            <option name='category' value='weights'>Weights</option>
                    </select>
                    <label>subcategory:</label>
                    <select className='select select-bordered focus:border-emerald-400' name='subcategory'> 
                        <option value=''>other</option>
                        {subCategoryInputs(category)}
                    </select>
                    <button className='btn btn-outline btn-sm text-emerald-400 hover:bg-emerald-400 hover:border-emerald-400'>Submit Question</button>
                </span>
            </form>
            <div className='all-questions space-x-4 carousel carousel-center bg-zinc-600 rounded-box w-11/12 p-2'>
                {questions.length=== 0 ? 'no questions, be the first to ask a question' : displayQuestions}
            </div>
        </>
    )
}