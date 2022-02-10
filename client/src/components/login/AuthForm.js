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

  let btnColor = btnText === 'Login' ? 'emerald' : 'lime'

  return (
    <form className='border-2 border-solid border-emerald-700 bg-emerald-900 form-control p-10 rounded-lg flex flex-column items-center' onSubmit={handleSubmit}>
      <label className='label-text' >
        Username
      </label>
      <input 
        className='m-2 input input-outline border-sky-600'
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        required />
      <label className='label-text'>
        Password
      </label>
      <input 
        className='m-2 input input-outline border-sky-600'
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        required/>
      <button className={`mt-10 mb-2 btn px-10 btn-outline btn-info`}>{ btnText }</button>
      <p className='alert alert-error' style={{ display: errMsg.length === 0 && 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">    
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
        </svg> 
        { errMsg }
      </p>
    </form>
  )
}