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
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        errMsg: ""
    }
    const initForum = {
        questions: [],
        userQuestions: [],
        questionComments: [],
        userComments: [],
        likedWorkouts: [],
        agreedComments: [],
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
    const [allShared, setAllShared] = useState({allExercises: [], allShared: [], shared: [], filter: []})
    const [liked, setLiked] = useState([])
    const [agreedComments, setAgreedComments] = useState([])
    // filters workout by all shared or user liked
    function handleLikedWorkoutsFilter(event) {
        const { value } = event.target
        console.log(value)
        if (value === 'all') {
            setAllShared(prevState => ({
                ...prevState,
                filter: prevState.allShared.filter(each => {
                    each.sharedObj = prevState.shared.find(sharedObj => sharedObj._id == each.sharedWorkout)
                    return each
                })
            }))
        } else if (value === 'liked') {
            setAllShared(prevState => ({
                ...prevState,
                filter: prevState.allShared.filter(each => {
                    const findLiked = each.likeWorkout.find(id => id == tokenState.user._id)
                    if (findLiked === undefined) {
                        return
                    }
                    const sharedObj = prevState.shared.find(sharedObj => sharedObj._id == each.sharedWorkout)
                    each.sharedObj = sharedObj
                    return each
                })
            }))
        }
    }
    // delete a comment on a question
    const deleteComment = async(commentId) => {
        try {
            const commentDeleted = await userAxios.delete(`/api/comment/${commentId}`).then(res => {
                getShared()
                getAllForum()
            })
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
            const likedWorkouts = await userAxios.get('/api/forum/share/liked').then(res => {
                setForum(prevState => ({
                    ...prevState,
                    likedWorkouts: res.data
                }))
            })
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
    // get all workouts from db for user
    const getWorkouts = async () => {
        try {
            // console.log('getting workouts')
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
    // get all forum questions
    const getForumQuestions = async () => {
        try {
            await userAxios.get('/api/forum')
                .then(res => console.log(res.data))
        }
        catch (err) {
            console.error(err)
        }
    }
    // get a specific comment
    function getSpecificComment(forumId, commentId) {
        userAxios.get(`/api/forum/${forumId}/comments/${commentId}`)
            .then(res => {return res.data})
            .catch(err => console.log(err))
    }
    // updates state for input change for a question
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
    // post sumbit for new question to db, update state, get call after successfull post
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
    // get call for forum question and comments posted on question
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
    // get a question
    function getQuestion(forumId) {
        userAxios.get(`/api/forum/${forumId}`)
            .then(res =>  {
                res.data.comments = getQuestionComments(forumId)
                setOneForum(res.data)
            })
            .catch(err => console.log(err))
    }
    // get comments for a question
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
    const getAllComments = async () => {
        try {
            const comments = await userAxios.get('/api/comment').then(res => {
                setAllComments(prevState => res.data)
            })
            const userAgreedComments = await userAxios.get('/api/comment').then(res => {
                setForum(prevState => ({
                    ...prevState,
                    agreedComments: res.data.filter(comment => {
                        if (comment.agree.find(userId => userId == tokenState.user._id)) return comment
                    })
                }))
                setAgreedComments(res.data.filter(comment => {
                    if (comment.agree.find(userId => userId == tokenState.user._id)) return comment
                }))
            const commentsByUser = userAxios.get('/api/comment').then(res => {
                setForum(prevState => ({
                    ...prevState,
                    userComments: res.data.filter(comment => {
                        if (comment.user === tokenState.user._id) {
                            return comment
                        }
                    })
                }))
            })
            })
        }
        catch(err) {
            console.error(err)
        }
    }
    const getAllForum = async () => {
        try {
            getAllComments()
            const forum = await userAxios.get('/api/forum/').then(res => {
                setForum(prevState => ({
                    ...prevState,
                    questions: res.data,
                    userQuestions: res.data.filter(each => each.user === tokenState.user._id)
                }))})
            const liked = await userAxios.get('/api/forum/').then(res => {
                setLiked(res.data.filter(each => {
                    const liked = each.likes.find(userId => userId === tokenState.user._id)
                    if (liked) return each
                }))
            })
        }
        catch(err) {
            console.error(err)
        }
    }
    // updated post comment on a question
    const postForumCommentUpdated = async (forumId, commentObj) =>  {
        try {
            const comment = await userAxios.post(`/api/forum/${forumId}`, commentObj).then(res => {
                setOneForum(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, res.data]
                }))
                getAllForum()
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
            .then(res => { getAllForum(); getForumCardInfo(forumId);  })
            .catch(err => console.log(err))
    }
    const renderForumProvider = async () => {
        try {
            const getForum = await getAllForum()
            const getWorkout = await getWorkouts()
        }
        catch(err) {
            console.error(err)
        }
    }
    return (
        <ForumContext.Provider
            value={{
                ...forum,
                agreedComments,
                handleLikedWorkoutsFilter,
                setForum,
                renderForumProvider,
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
