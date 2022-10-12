const express = require('express')

const { createWorkout, getWorkouts, getWorkoutById, deleteWorkoutById, updateWorkoutById } = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


/**
 * PATH /api/workouts
 */


/**
 * Middleware
 */

router.use(requireAuth)

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
router.patch('/:id', updateWorkoutById)
/**
 * Delete one workout
 */
router.delete('/:id', deleteWorkoutById)




module.exports = router