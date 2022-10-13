import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../hooks/useAuthContext'
import { ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
   
    const loginUser = async () => {
        return await axios.post('http://localhost:4000/api/user/login', {
            email, password
        })
    }

    const loginUserMutation = useMutation(loginUser, {
        onSuccess: resp => {
            // console.log(resp.data)
            // set local storage
            localStorage.setItem('user', JSON.stringify(resp.data))

            // // update auth context
            dispatch({type: 'LOGIN', payload: resp.data})

            setError(null)

            // toast notification
            toast.success('Logged in', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });

            navigate('/')

        },
        onError: error => {
            setError(error.response.data.error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        
        loginUserMutation.mutate()
    }


    return(
        <>
            <form className='login' onSubmit={onSubmit}>
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

                <button>{loginUserMutation.isLoading ? 
                            <ThreeDots 
                                height="20" 
                                width="40" 
                                radius="9"
                                color="#FFF" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            /> : 'Login'}</button>     
                {error ? <div className='error'>{error}</div> : ''}

                {loginUserMutation.isSuccess ?
                     <ToastContainer />  : null 
                }

            </form>
        </>
    )
}


export default Login