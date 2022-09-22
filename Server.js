const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const MylibraryRoute = require('./routers/mylibrary')
// Config dotev
require('dotenv').config({
    path: './config/config.env'
})


const app = express()

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json())
// Load routes
// const authRouter = require('./routes/auth.route')
// const userRouter = require('./routes/user.route')
// const userDataRouter = require('./routes/userData.router')
// const imageRoute = require('./routes/image-route');
// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

// Use Routes
// app.use('/api', authRouter)
// app.use('/api', userRouter)
// app.use('/api', userDataRouter)
// app.use('/api', imageRoute)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT || 5000

app.use('/api/book', MylibraryRoute)
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});