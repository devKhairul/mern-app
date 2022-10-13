import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"



const Home = () => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
  
    if (!user) {
      navigate('/login')
    }
  }, [])
  

  const { isLoading, data: workouts } = useQuery(['workoutData'], async () => 
    await fetch('http://localhost:4000/api/workouts', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then((res => res.json()))
    .catch(error => console.log(error))
  )



  if (isLoading) {
    return <div>Loading Workouts</div>
  }

  if (workouts.error) {
    return <div>Something went wrong</div>
  }
 
 
  return (
    <>
      {workouts.length === 0 ? <h2>No workout found</h2> : ''}
      
      {workouts && (
        <div className="home">
          <div className="workouts">
            {workouts.map(workout => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))}
          </div>
          <WorkoutForm />  
        </div>
      )}
      
    </>
  )
}

export default Home