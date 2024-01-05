const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const { User } = require("../models/userModel")

const protect = asyncHandler( async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, "4qwerty4")
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, No token')
        // console.log("no token")
    }
})

module.exports = {protect}