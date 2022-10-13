import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const WorkoutForm = () => {

    const queryClient = new useQueryClient()

    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user.token)

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const workout = {title, load, reps}
    

    const createWorkout = async () => {

      const response = await fetch('http://localhost:4000/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
       
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
        }
    }
    
    const mutation = useMutation(createWorkout, {
        onSuccess: data => {
            queryClient.invalidateQueries('workoutData')
            console.log(data)
            // if (data !== undefined) {
            //     toast.success('Workout added', {
            //         position: "top-right",
            //         autoClose: 1000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         progress: undefined,
            //     });
            // }
            
        },
        onError: (error) => {
            console.log(error)
        }
        
    })
    
    const onSubmit = (e) => {
        e.preventDefault()
        mutation.mutate(workout)
    }


  return (
    <form className='create' onSubmit={onSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input 
            type="text" 
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            required
        />
        
        <label>Load (kg):</label>
        <input 
            type="number" 
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            required
        />

        <label>Reps:</label>
        <input 
            type="number" 
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            required
            
        />
        <button>

        { mutation.isLoading ? 
            <ThreeDots 
                height="20" 
                width="40" 
                radius="9"
                color="#FFF" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            /> : 'Add Workout' 
        }
        </button>
        
        { mutation.isSuccess ? 
            <ToastContainer />  : null 
        }
        
        {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default WorkoutForm