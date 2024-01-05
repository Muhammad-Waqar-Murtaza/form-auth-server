const { User } = require("../models/userModel")
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.userSignup = asyncHandler( async (req, res) => {

    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: "Please fill in all fields" })
        throw new Error("Please fill in all fields")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({ message: "User already exists" })
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

exports.userLogin = asyncHandler( async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

exports.loggedIn = asyncHandler ( async (req, res) => {

    try{
        const foundUser = await User.findById(req.user.id).select("-password")
        res.status(201).json(foundUser)
    }catch(err){
        res.status(401)
        throw new Error('Not Auhtorized')
    }
})

const generateToken = (id) => {
    return jwt.sign({id}, "4qwerty4", {expiresIn: '7d'})
}