import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider.js'
import ForumProvider from './context/forumProvider'
import ExerciseProvider from './context/exerciseProvider'
import ProfileProvider from './context/profileProvider'
import './index.css'
// import './css/styles.css'

ReactDOM.render(
  <UserProvider>
    <ProfileProvider>
      <ForumProvider>
        <ExerciseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ExerciseProvider>
      </ForumProvider>
    </ProfileProvider>
  </UserProvider>,
  document.getElementById('root')
)