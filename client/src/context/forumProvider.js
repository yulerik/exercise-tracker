import React, { useState } from 'react'
import axios from 'axios'
import { FilterIcon } from '@heroicons/react/solid'

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
    const [oneForum, setOneForum] = useState({})

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
    function handleQuestionSubmit(event) {
        event.preventDefault()
        userAxios.post('/api/forum/', forum.questionInputs)
            .then(res => {
                setForum(prevState => ({
                    ...prevState,
                    questions: [...prevState.questions, res.data],
                    questionInputs: {
                        question: '',
                        category: '',
                        subcategory: ''
                    }
                }))

            })
            .catch(err => console.log(err))
    }
    function getQuestion(forumId) {
        userAxios.get(`/api/forum/${forumId}`)
            .then(res => setOneForum(res.data))
            .catch(err => console.log(err))
    }
    function getAllForum() {
        userAxios.get('/api/forum/')
            .then(res => {
                setForum(prevState => ({
                    ...prevState,
                    questions: [...prevState.questions, ...res.data]
                }))
            })
            .catch(err => console.log(err))
    }
    function postForumComment(forumId, commentObj) {
        userAxios.post(`/api/forum${forumId}`, commentObj)
            .then(res => console.log(res))
            .catch(err => console.l0g(err))
    }
    function likeQuestion(forumId) {
        userAxios.put(`/api/forum/${forumId}`)
            .then(res => setForum(prevState => ({
                ...prevState,
                questions: prevState.questions.filter(each => {
                    if (each._id === forumId) {
                        return res.data
                    }
                    return
                })
            })))
            .catch(err => console.log(err))
    }

    return (
        <ForumContext.Provider
            value={{
                ...forum,
                handleQuestionChange,
                handleQuestionSubmit,
                getAllForum,
                getQuestion,
                likeQuestion,
                oneForum
            }}
        >
            {props.children}
        </ForumContext.Provider>
    )
}
