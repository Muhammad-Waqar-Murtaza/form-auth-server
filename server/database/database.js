const mongoose = require("mongoose")
const URI = "mongodb://127.0.0.1:27017/auth"

const connectDB = async () => {
    try{
        await mongoose.connect(URI)
    } catch{
        console.log("Could not connect to database");
    }
}

module.exports = {connectDB}