import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useQuery } from '@tanstack/react-query'


const Home = () => {
  
  const { isLoading, data: workouts } = useQuery(['workoutData'], () => 
    fetch('http://localhost:4000/api/workouts').then((res => res.json()))
  )

  if (isLoading) {
    return <div>Loading Workouts</div>
  }

  

 
  return (
    <>
      {workouts.length === 0 ? <h2>No workout found</h2> : ''}
      <div className="home">
        <div className="workouts">
          {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        </div>
        <WorkoutForm />  
      </div>
    </>
  )
}

export default Home