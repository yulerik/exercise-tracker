import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider.js'
import './css/styles.css'

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
)