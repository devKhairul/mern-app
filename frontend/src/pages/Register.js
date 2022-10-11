import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../hooks/useAuthContext'
import { ThreeDots } from  'react-loader-spinner'
import axios from 'axios'

const Register = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { dispatch } = useAuthContext()
   
    const createAccount = async () => {
        return await axios.post('http://localhost:4000/api/user/register', {
            email, password
        })
    }

    const createAccountMutation = useMutation(createAccount, {
        onSuccess: resp => {
            // set local storage
            localStorage.setItem('user', JSON.stringify(resp.data))

            // // update auth context
            dispatch({type: 'LOGIN', payload: resp.data})

            setSuccess('Registration successful')
            setError(null)
        },
        onError: error => {
            setError(error.response.data.error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        
        createAccountMutation.mutate()
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

                <button>{createAccountMutation.isLoading ? 
                            <ThreeDots 
                                height="20" 
                                width="40" 
                                radius="9"
                                color="#FFF" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            /> : 'Register'}</button>     
                {error ? <div className='error'>{error}</div> : ''}
                {success ? <div className='success'>{success}</div> : ''}
                
                    
            </form>
             
        </>
    )
}


export default Register