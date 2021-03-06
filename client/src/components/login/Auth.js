import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className='flex flex-col w-12/12 justify-center items-center gap-8 pt-10 m-10'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-3xl tracking-wider underline underline-offset-8'>Exercise Tracker</h1>
        <p className='text-center m-1 p-1 text'>Sign up or Log in<br></br>track/share your exercises<br></br>ask questions in the forum</p>
        { !toggle ? 
          <p className='btn btn-outline btn-success' onClick={toggleForm}>Already a member?</p> :
          <p className='btn btn-outline btn-error' onClick={toggleForm}>Not a member?</p> 
        }
      </div>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          {/* <p className='btn btn-outline btn-success' onClick={toggleForm}>Already a member?</p> */}
        </> :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          {/* <p className='btn btn-outline btn-error' onClick={toggleForm}>Not a member?</p> */}
        </>
      }
    </div>
  )
}