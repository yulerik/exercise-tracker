import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserProvider' 

export default function Layout() {
    const { token, logout } = useContext(UserContext)
    return (
        <>
            <nav id='nav-home' style={{ display: !token && 'none' }} >
                <Link to='/profile'>Home</Link>
                <Link to='/forum'>Forum</Link>
                <button onClick={logout}>Logout</button>
            </nav>
            <Outlet />
        </>
    )
}