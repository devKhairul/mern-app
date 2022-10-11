import React, { useState } from 'react'

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password);
    }

    return(
        <>
            <form className='login' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label htmlFor="email"></label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                />

                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}
                />

                <button>Login</button>

            </form>
        </>
    )
}


export default Login