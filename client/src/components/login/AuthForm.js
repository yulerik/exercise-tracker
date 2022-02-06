import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      username, 
      password
    } 
  } = props

  return (
    <form className='border-2 border-solid border-indigo-600 form-control p-10 rounded-lg flex flex-column items-center' onSubmit={handleSubmit}>
      <label className='label-text' >
        Username
      </label>
      <input 
        className='m-2 input input-primary input-bordered'
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        required />
      <label className='label-text'>
        Password
      </label>
      <input 
        className='m-2 input input-secondary input-bordered'
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        required/>
      <button className='mt-10 btn btn-primary'>{ btnText }</button>
      <p style={{color: "red"}}>{ errMsg }</p>
    </form>
  )
}