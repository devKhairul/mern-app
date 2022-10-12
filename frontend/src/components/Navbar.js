import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'


const Navbar = () => {

  const { user } = useAuthContext()

  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1>Workout</h1>
            </Link>
            <nav>
              { user && (
                <div>
                  <span>{user.email}</span>
                  &nbsp;
                  <button onClick={handleClick}>Logout</button>
                </div>
              )}
              
              { !user && (
                <div>
                  <Link to="/login">Login</Link> 
                  <Link to="/register">Register</Link>
                </div>
              )}
              
            </nav>
        </div>
    </header>
  )
}

export default Navbar