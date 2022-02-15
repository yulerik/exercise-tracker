import React from 'react'
import { AnnotationIcon } from '@heroicons/react/solid'

export default function AddForumComment(props) {
    return (
        <div 
            className='w-full flex flex-col items-center'
            >
            <form 
                onSubmit={props.handleCommentSubmit} 
                className='flex flex-row w-10/12 justify-around items-center border border-black rounded-2xl m-2 p-2 bg-neutral'
                >
                <label>add a comment:</label>
                <input 
                    name='comment' 
                    onChange={props.handleCommentChange} 
                    value={props.comment.comment} 
                    className='input input-bordered w-1/2 focus:border-emerald-400'
                    required
                    >
                </input>
                <button 
                    className='btn btn-sm btn-outline'
                    >
                    <AnnotationIcon 
                        className='h-4 w-4 m-1'
                    />
                        comment
                </button>
            </form>
        </div>
    )
}