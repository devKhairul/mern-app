const { isValidObjectId, isObjectIdOrHexString } = require('mongoose')

const Workout = require('../models/workoutModel')


/**
 * 
 * @param {title, reps, load} req 
 * @param {*} res 
 * 
 * Crete a workout
 * 
 */
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get all workouts
 */
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({createdAt: -1})
    res.status(200).json(workouts)
}

/**
 * 
 * @param {id} req 
 * @param {*} res 
 * @returns 
 * 
 * Get single workout by _id
 * 
 */
const getWorkoutById = async (req, res) => {
    const { id } = req.params

    if (!isObjectIdOrHexString(id)) {
        return res.status(404).json({msg: 'Invalid document ID'}) 
    }
    
    const workout = await Workout.findById(id)
    
    if (!workout) {
        return res.status(404).json({msg: 'Invalid or non-existent document ID'})
    }
    
    res.status(200).json(workout)
}


/**
 * 
 * @param {id} req 
 * @param {*} res 
 * @returns 
 * 
 * Delete single workout by _id
 */

const deleteWorkoutById = async (req, res) => {
    const { id } = req.params
    
    if (!isObjectIdOrHexString(id)) {   
        return res.status(400).json({msg: 'Invalid document ID'})
    }
    
    const workout = await Workout.findByIdAndRemove(id)
    
    if (!workout) {
        return res.status(404).json({msg: 'Invalid or non-existent document ID'})
    }
    
    res.status(200).json({success: true, id: id})
}




module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    deleteWorkoutById
}