import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1>Workout</h1>
            </Link>
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>
        </div>
    </header>
  )
}

export default Navbar