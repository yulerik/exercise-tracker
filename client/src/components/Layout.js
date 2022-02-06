import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserProvider' 

export default function Layout() {
    const { token, logout } = useContext(UserContext)
    return (
        <>
            <nav id='nav-home' className='navbar fixed w-full flex flex-row justify-evenly mb-2 shadow-lg bg-neutral text-neutral-content' style={{ display: !token && 'none' }} >
                <Link className='btn btn-outline' to='/profile'>Profile</Link>
                <Link className='btn btn-outline' to='/forum'>Forum</Link>
                <button className='btn btn-ghost' onClick={logout}>Logout</button>
            </nav>
            <Outlet />
        </>
    )
}