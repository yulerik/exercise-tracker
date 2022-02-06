import React, { useEffect, useState } from 'react'
import AddForumComment from './AddForumComment'
import { useLocation } from 'react-router-dom'
import { ThumbUpIcon } from '@heroicons/react/solid'

export default function ForumCard(props) {
    const location = useLocation()
    const {question, category, subcategory, _id} = location.state

    const [forumState, setForumState] = useState(location.state)
    
    function handleLike(event) {
        props.like(_id)
        setForumState(prevState => ({
            ...prevState,
            
        }))
    }
    
    useEffect(() => {
        props.props(_id)
    }, [])
    
    return (
        <>
            <div className='forum-card rounded-full flex flex-col border-2 solid w-11/12 p-2 border-stone-400'>
                <span className='flex flex-row w-1/4 justify-evenly'>
                    <span className='badge bg-indigo-600 text-slate-300'>{forumState.category}</span>
                    <span className='badge bg-indigo-600 text-slate-300'>{forumState.subcategory}</span>
                </span>
                <div className='flex flex-col items-center text-2xl tracking-wider p-1'>
                    <h1>{forumState.question}</h1>
                    <ThumbUpIcon onClick={handleLike} className='self-end mr-5 btn btn-xs btn-outline text-white' />
                </div>
            </div>
            <AddForumComment />
        </>
    )
}