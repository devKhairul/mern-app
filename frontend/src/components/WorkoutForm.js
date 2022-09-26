import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'


const WorkoutForm = () => {

    const queryClient = new useQueryClient()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
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
            queryClient.invalidateQueries(['workoutData'])
        }
    }


  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exerercise Title:</label>
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
        <button>Add workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm