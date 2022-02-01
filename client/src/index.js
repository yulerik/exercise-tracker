import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider.js'
import ExerciseProvider from './context/exerciseProvider'
import ProfileProvider from './context/profileProvider'
import './css/styles.css'

ReactDOM.render(
  <UserProvider>
    <ProfileProvider>
      <ExerciseProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ExerciseProvider>
    </ProfileProvider>
  </UserProvider>,
  document.getElementById('root')
)