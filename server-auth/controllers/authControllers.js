import bcrypt from "bcryptjs"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"
import asyncHandler from "../utils/asyncHandler.js"

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400)

        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    })

    if (existingUser) {
        res.status(400)
        throw new Error("Username or Email already exist.")
    }

    const hashedPassword = await
    
})