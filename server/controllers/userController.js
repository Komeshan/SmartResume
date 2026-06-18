import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js"

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token
}

//controller for user registration and login
//POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //check if required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }

        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ 
            name, email, password: hashedPassword 
        })

        // return success response with token 
        const token = generateToken(newUser._id)
        newUser.password = undefined // hide password in response

        res.status(201).json({ 
            message: "User registered successfully", 
            token, 
            user: newUser
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


//controller for user login
//POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        //check if password is correct
        if (!await user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // Ensure aiUsage limits exist
        if (!user.aiUsage) {
            user.aiUsage = {
                summaryCount: 0,
                summaryLastReset: new Date(),
                parserCount: 0,
                parserLastReset: new Date(),
                imageCount: 0,
                imageLastReset: new Date()
            }
            await user.save()
        }

        // return success response with token
        const token = generateToken(user._id)
        user.password = undefined // hide password in response
        res.status(200).json({ 
            message: "User logged in successfully", 
            token, 
            user
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


//controller for getting user by id
//GET: /api/users/:id
export const getUserById = async (req, res) => {
    try {

        const userId = req.userId

        //check if user exists
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Ensure aiUsage limits exist
        if (!user.aiUsage) {
            user.aiUsage = {
                summaryCount: 0,
                summaryLastReset: new Date(),
                parserCount: 0,
                parserLastReset: new Date(),
                imageCount: 0,
                imageLastReset: new Date()
            }
            await user.save()
        }

        //return user
        user.password = undefined // hide password in response
        res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// controller for getting user resume
// GET: /api/users/resume

export const getUserResume = async (req, res) => {
    try {
       const userId = req.userId
       
       //return user resumes 
       const resumes = await Resume.find({userId})
       return res.status(200).json({ resumes })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}