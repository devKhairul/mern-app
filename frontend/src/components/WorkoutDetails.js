import { useQueryClient } from "@tanstack/react-query"
import { ToastContainer, toast } from 'react-toastify';
import { formatDistanceToNowStrict } from 'date-fns'

const WorkoutDetails = ({workout}) => {

    const queryClient = new useQueryClient()

    const {title, load, reps, createdAt} = workout
    
    const handleClick = async () => {
        
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE'  
        })

        const json = await response.json()

        if (json.success === true) {

            queryClient.invalidateQueries('workoutData')

            toast.success('Workout deleted', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="workout-details">
            <h4>{title}</h4>
            <p><strong>Load (kg): </strong>{load}</p>
            <p><strong>Reps:</strong>{reps}</p>
            <p>{ formatDistanceToNowStrict(new Date(createdAt), {addSuffix: true}) }</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete_forever</span>
            <ToastContainer />
        </div>        
    )
}

export default WorkoutDetails