import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const ForumContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ForumProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        errMsg: ""
    }
    const initForum = {
        questions: [],
        userQuestions: [],
        questionComments: [],
        exercises: [],
        allWorkouts: [],
        notSharedWorkouts: [],
        sharedWorkouts: [],
        questionInputs: {
            question: '',
            category: '',
            subcategory: ''
        }
    }
    // state
    const [tokenState, setTokenState] = useState(initState)
    const [forum, setForum] = useState(initForum)
    const [oneForum, setOneForum] = useState({comments: [], info: {}})
    const [allComments, setAllComments] = useState([])
    const [allShared, setAllShared] = useState({allExercises: [], allShared: [], shared: []})
    // delete a comment on a question
    const deleteComment = async(commentId) => {
        try {
            const commentDeleted = await userAxios.delete(`/api/comment/${commentId}`).then(getShared())
        }
        catch(err) {
            console.error(err)
        }
    }
    // delete a question 
    const questionDelete = async(questionId) => {
        try {
            const questionDeleted = await userAxios.delete(`/api/forum/${questionId}`).then(getAllForum())
        }
        catch(err) {
            console.error(err)
        }
    }
    // like a shared workout
    const likeSharedWorkout = async(sharedId) => {
        try {
            const sharedLike = await userAxios.put(`/api/workout/shared/${sharedId}`).then(res => getShared())
        }
        catch(err) {
            console.error(err)
        }
    }
    // get allShared workouts from db, replace WorkoutIds w/WorkoutObjs
    const getShared = async () => {
        try {
            const sharedExercises = await userAxios.get('/api/workout/shared')
            setAllShared(prevState => ({
                ...prevState,
                allShared: sharedExercises.data
            }))
            const allExercises = await userAxios.get('/api/exercise/forum')
            setAllShared(prevState => ({
                ...prevState,
                allExercises: allExercises.data
            }))
            const shared = await userAxios.get('/api/forum/share')
                setAllShared(prevState => ({
                    ...prevState,
                    shared: shared.data.map(workout => {
                        const findExerciseObjs = workout.exercises.map(exerciseId => {
                            return allExercises.data.find(exercise => exercise._id === exerciseId)
                        })
                        const dateArray = workout.date.split('')
                        workout.exercises = findExerciseObjs
                        dateArray.splice(10)
                        workout.date = dateArray.join('')
                        return workout
                    })
                }))
            const userComments = await userAxios.get('/api/forum/comments')
            setForum(prevState => ({
                ...prevState,
                questionComments: userComments.data
            }))
        }
        catch(err) {
            console.error(err)
        }
        
    }
    // remove workout from shared db, update shared flag
    const unshareWorkout = async (workoutId, sharedId) => {
        try {
            userAxios.delete(`/api/workout/${workoutId}/${sharedId}`)
                .then(res => {
                    getWorkouts()
                    getShared()
                })
        }
        catch(err) {
            console.error(err)
        }
    }
    // add workout to shared db, update shared flag
    const shareWorkout = async (workoutId) => {
        try {
            userAxios.post('/api/workout/shared', {"sharedWorkout": workoutId})
                .then(res => {
                    getWorkouts()
                    getShared()
                })
        }
        catch(err) {
            console.error(err)
        }
    }

    const getWorkouts = async () => {
        try {
            console.log('getting workouts')
            const exercise = await userAxios.get('/api/exercise')
            setForum(prevState => ({
                ...prevState,
                exercises: [...exercise.data]
            }))
            const workout = await userAxios.get('/api/workout')
            setForum(prevState => ({
                ...prevState,
                allWorkouts: [...workout.data.map(workout => {
                    const exerciseObj = workout.exercises.map(each => {
                        return prevState.exercises.find(exercise => exercise._id === each)
                    })
                    workout.exercises = exerciseObj
                    const dateArray = workout.date.split('')
                    dateArray.splice(10)
                    workout.date = dateArray.join('')
                    return workout
                })],
                sharedWorkouts: [...workout.data.filter(each => each.shared.isShared)],
                notSharedWorkouts: [...workout.data.filter(each => !each.shared.isShared)]
            }))

        }
        catch(err) {
            console.error(err)
        }
    }

    const getForumQuestions = async () => {
        try {
            await userAxios.get('/api/forum')
                .then(res => console.log(res.data))
        }
        catch (err) {
            console.error(err)
        }
    }

    // function getAllComments(questionId) {
    //     userAxios.get(`/api/forum/${questionId}/comments`)
    //         .then(res => {
    //             setForum(prevState => ({
    //                 ...prevState,
    //                 questions: prevState.questions.find(each => {
    //                     if (each._id === questionId) {
    //                         each.comments = res.data
    //                         return
    //                     }
    //                     return
    //                 })
    //             }))
    //         })
    //         .catch(err => console.log(err))
    // }
    function getSpecificComment(forumId, commentId) {
        userAxios.get(`/api/forum/${forumId}/comments/${commentId}`)
            .then(res => {return res.data})
            .catch(err => console.log(err))
    }

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
                getAllForum()

            })
            .catch(err => console.log(err))
    }
    function findComment(id, comments) {
        const comment = comments.find(each => each._id === id)
        return comment
    }
    const getForumCardInfo = async (forumId) => {
        try {
            let forumObj = {
                info: {},
                comments: []
            }
            const forumInfo = userAxios.get(`/api/forum/${forumId}`)
                .then(res => {
                    forumObj.info = res.data
                    setOneForum(prevState => ({
                        ...prevState,
                        info: res.data
                    }))
                })
            const forumComments = userAxios.get(`/api/comment/${forumId}`)
                .then(res => {
                    forumObj.comments = res.data
                    setOneForum(prevState => ({
                        ...prevState,
                        comments: res.data
                    }))
                })
            return forumObj
        }
        catch(err) {
            console.error(err)
        }
    }
    function getQuestion(forumId) {
        userAxios.get(`/api/forum/${forumId}`)
            .then(res =>  {
                res.data.comments = getQuestionComments(forumId)
                setOneForum(res.data)
            })
            .catch(err => console.log(err))
    }
    function getQuestionComments(forumId) {
        userAxios.get(`/api/comment/${forumId}`)
            .then(res => {
                setOneForum(prevState => ({
                    ...prevState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err))
    }
    function getAllComments() {
        userAxios.get('/api/comment')
            .then(res => setAllComments(prevState => [...prevState, ...res.data]))
            .catch(err => console.log(err))
    }
    function getAllForum() {
        userAxios.get('/api/forum/')
            .then(res => {
                getAllComments()
                setForum(prevState => ({
                    ...prevState,
                    questions: res.data,
                    userQuestions: res.data.filter(each => each.user === tokenState.user._id)
                }))
            })
            .catch(err => console.log(err))
    }
    function postForumComment(forumId, commentObj) {
        userAxios.post(`/api/forum/${forumId}`, commentObj)
            .then(res => {
                getAllForum()
                setOneForum(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, res.data]
                }))
            })
            .catch(err => console.log(err))
    }
    const postForumCommentUpdated = async (forumId, commentObj) =>  {
        try {
            const comment = await userAxios.post(`/api/forum/${forumId}`, commentObj).then(res => {
                setOneForum(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, res.data]
                }))
            })
        }
        catch(err) {    
            console.error(err)
        }
    }
    // like or unlike comment on forum question
    const likeCommentQuestion = async (forumId, questionId) => {
        const like = await userAxios.put(`/api/forum/${forumId}/comments/${questionId}`)
            .then(res =>
                getQuestionComments(forumId)
            ).catch(err => console.log(err))
    }
    // like or unlike a question
    const likeQuestion = async (forumId) => {
        const like = await userAxios.put(`/api/forum/${forumId}/like`)
            .then(res => getForumCardInfo(forumId))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            if(tokenState.token) {
                getAllForum()
                getWorkouts()
                console.log('forum context reneder')
                return () => { isMounted = false }
            }
        }
    }, [tokenState.token])

    return (
        <ForumContext.Provider
            value={{
                ...forum,
                questionDelete,
                deleteComment,
                likeSharedWorkout,
                getShared,
                tokenState,
                likeCommentQuestion,
                getWorkouts,
                handleQuestionChange,
                handleQuestionSubmit,
                getAllForum,
                getQuestion,
                likeQuestion,
                postForumComment,
                getSpecificComment,
                getAllComments,
                getForumQuestions,
                shareWorkout,
                unshareWorkout,
                getForumCardInfo,
                postForumCommentUpdated,
                allShared,
                oneForum
            }}
        >
            {props.children}
        </ForumContext.Provider>
    )
}
