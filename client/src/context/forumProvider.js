import React, { useState } from 'react'
import axios from 'axios'

export const ForumContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ForumProvider(props) {
    const initForum = {
        questions: [],
        sharedWorkouts: [],
        questionInputs: {
            question: '',
            category: '',
            subcategory: ''
        }
    }

    const [forum, setForum] = useState(initForum)

    function handleQuestionChange(event) {
        const {name, value} = event.target
        setForum(prevState => ({
            ...prevState,
            questionInputs: {
                ...prevState.questionInputs,
                [name]: value
            }
        }))
    }

    return (
        <ForumContext.Provider
            value={{
                ...forum,
                handleQuestionChange
            }}
        >
            {props.children}
        </ForumContext.Provider>
    )
}
