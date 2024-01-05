const express = require('express')
const cors = require('cors')
const { connectDB } = require('./database/database')
const { userRoutes } = require('./routes/userRoutes')
const { errorHandler } = require("./middlewares/errorMiddleware")

const app = express()
const port = process.env.PORT || 3000

// middleware
const corsOptions = {
    origin: 'https://mern-projects-iota.vercel.app',
    methods: ["GET", "POST"],
    credentials: true,
  }

app.use(cors(corsOptions))

app.use(express.json())
connectDB()

// app routes

app.get("/", (req, res) => {
    res.send("app is running")
})
app.use('/user', userRoutes)

// error middleware
app.use(errorHandler)

// connecting to database

app.listen(port, () => {
    console.log("Database & Server connection established")
})