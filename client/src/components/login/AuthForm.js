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

  const formSpan = 'relative z-0 w-3/4 mb-6 group '
  const formInput = 'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  const formLabel = 'absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'

  return (
    <form className='w-80 pt-10 form-control rounded-lg flex flex-column items-center' onSubmit={handleSubmit}>
      <span className={formSpan}>
        <input 
          className={formInput}
          type="text" 
          value={username} 
          name="username" 
          onChange={handleChange} 
          placeholder=' '
          required 
        />
        <label className={formLabel} >
          Username
        </label>
      </span>
      <span className={formSpan}>
        <input 
          className={formInput}
          type="text" 
          value={password} 
          name="password" 
          onChange={handleChange} 
          placeholder=' '
          required/>
        <label className={formLabel}>
          Password
        </label>
      </span>
      
      <button className={`mt-10 mb-2 btn px-10 btn-outline btn-info`}>{ btnText }</button>
      <p className='alert alert-error' style={{ display: !errMsg && 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">    
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
        </svg> 
        { errMsg }
      </p>
    </form>
  )
}