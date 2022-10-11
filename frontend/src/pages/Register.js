import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../hooks/useAuthContext'
import { ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { dispatch } = useAuthContext()

    const createAccount = async () => {
        const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            return json.error 
        }

        if (response.ok) {
           return json
        }
    }

    const mutation = useMutation(createAccount, {
        onSuccess: data => {
            // Set Local Storage
            localStorage.setItem('user', JSON.stringify(data))

            // Dispatch Login 
            dispatch({type: 'LOGIN', payload: data })
        },
        onSettled: error => {
            setError(error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        
        mutation.mutate()
    }

    return(
        <>
            <form className='signup' onSubmit={onSubmit}>
                <h3>Register</h3>
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

                <button>{mutation.isLoading ? <ThreeDots 
                            height="20" 
                            width="40" 
                            radius="9"
                            color="#FFF" 
                            ariaLabel="three-dots-loading"
                            wrapperClassName=""
                            visible={true}
                        /> : 'Register' }</button>     
                {error ? <div className='error'>{error}</div> : ''}
                {mutation.isSuccess ? <div className='success'>Registration successful</div> : ''}
                    
            </form>
             
        </>
    )
}


export default Register