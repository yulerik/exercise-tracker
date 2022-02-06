import React, { useState } from 'react'
import { AnnotationIcon } from '@heroicons/react/solid'

export default function AddForumComment() {
    const [comment, setComment] = useState({comment: ''})

    function handleComment(event) {
        const {name, value} = event.target
        setComment(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleCommentSubmit(event) {
        event.preventDefault()
        
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <form onSubmit={handleCommentSubmit} className='flex flex-row w-10/12 justify-around items-center border border-black rounded-2xl m-2 p-2 bg-neutral'>
                <label>add a comment:</label>
                <input name='comment' onChange={handleComment} value={comment.comment} className='input input-bordered w-1/2 focus:border-emerald-400'></input>
                <button className='btn btn-sm btn-outline'><AnnotationIcon className='h-4 w-4 m-1' />comment</button>
            </form>
        </div>
    )
}