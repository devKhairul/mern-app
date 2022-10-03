const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * Static Register method
 */

userSchema.statics.register = async function (email, password) {

    if (!email || !password) {
        throw Error('Email and password are required')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email address')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hashedPassword})

    return user

}


/**
 * Static Login method
 */
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Email and password are required')
    }
    
    const user = await this.findOne({email})

    if (!user) {
        throw Error('User does not exist')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw Error('Incorrect password')
    }

    return user


}


module.exports = mongoose.model('User', userSchema)