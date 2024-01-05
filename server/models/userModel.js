const mongoose = require("mongoose");

const userSignUp = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true }
})

const User = mongoose.model("user", userSignUp)

module.exports = { User }