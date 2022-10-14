import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const WorkoutForm = () => {

    const queryClient = new useQueryClient()

    const user = JSON.parse(localStorage.getItem('user'))

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const workout = {title, load, reps}
    

    const createWorkout = async () => {

      return await fetch('http://localhost:4000/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }
    
    const mutation = useMutation(createWorkout, {
        onSuccess: data => {
            queryClient.invalidateQueries('workoutData')
            
            if (data.status === 200) {
                toast.success('Workout added', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                });

                setError(null)
                setTitle('')
                setLoad('')
                setReps('')
            }          
        },
        onSettled: (error) => {
        //    console.log(error)
           
           if (error.status === 401) {
            setError(error.statusText)
           }
           
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