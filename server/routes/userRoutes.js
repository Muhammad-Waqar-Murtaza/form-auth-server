const express = require('express')
const { userSignup, userLogin, loggedIn } = require('../controllers/userController')
const { protect } = require('../middlewares/userAuth')
const userRoutes = express.Router()

userRoutes.post('/signup', userSignup)
userRoutes.post('/login', userLogin)
userRoutes.get('/profile', protect, loggedIn)

module.exports = { userRoutes }