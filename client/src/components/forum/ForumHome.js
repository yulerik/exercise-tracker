import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForumHome(props) {
    const {handleQuestionChange, questionInputs : {question, category, subcategory}} = props
    // displays options for current input of category
    function subCategoryInputs(category) {
        const weightSubCategories = ['abs', 'arms', 'calves', 'chest', 'legs', 'shoulders']
        const cardioSubCategories = ['running', 'biking', 'hiking', 'walking', 'stairs', 'swimming', 'rowing']

        if (category === 'weights') {
            return (
                weightSubCategories.map(each => 
                    <option value={each}>{each}</option>    
                )
            )
        } else if (category === 'cardio') {
            return (
                cardioSubCategories.map(each => 
                    <option value={each}>{each}</option>    
                )
            )
        }
        return
    }

    return (
        <>
            <h1>Forum Home</h1>
            <form onChange={handleQuestionChange}>
                <label>Question:</label>
                <textarea name='question' value={question}></textarea>
                    <label>Category:</label>
                    <select name='category'>    
                            <option name='category' value=''>Other</option>
                            <option name='category' value='cardio'>Cardio</option>
                            <option name='category' value='weights'>Weights</option>
                    </select>
                    <label>subcategory:</label>
                    <select name='subcategory'> 
                        <option value=''>other</option>
                        {subCategoryInputs(category)}
                    </select>
                    <button>Submit Question</button>
            </form>
            <hr></hr>

        </>
    )
}