const express = require('express')

const { createWorkout, getWorkouts, getWorkoutById, deleteWorkoutById } = require('../controllers/workoutController')

const router = express.Router()

/**
 * PATH /api/workouts
 */


/**
 * Get all workouts
 */
router.get('/', getWorkouts)
/**
 * Get single workout
 */
router.get('/:id', getWorkoutById)
/**
 * Create new workout
 */ 
router.post('/', createWorkout) 
/**
 * Update one workout
 */
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update a workout'})
})
/**
 * Delete one workout
 */

router.delete('/:id', deleteWorkoutById)




module.exports = router