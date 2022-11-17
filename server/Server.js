const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require("cookie-session");
const MylibraryRoute = require('./routers/mylibrary')

// Config dotev
require('dotenv').config({
    path: './config/config.env'
})
const logger = morgan
const app = express()
app.use(logger('dev'))
// Connect to database
connectDB();

// app.use(bodyParser.json())
app.use(express.json())
// Load routes
// const authRouter = require('./routes/auth.route')
// const userRouter = require('./routes/user.route')
// const userDataRouter = require('./routes/userData.router')
// const imageRoute = require('./routes/image-route');
// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
    app.use(morgan('dev'))
}
app.use(cors())
// Use Routes
// app.use('/api', authRouter)
// app.use('/api', userRouter)
// app.use('/api', userDataRouter)
// app.use('/api', imageRoute)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: "mylibrary",
        secret: process.env.COOKIE_SECRET,
        httpOnly: true
    })
);

require('./routers/auth.routes')(app);
require('./routers/user.routes')(app);

app.use('/api/book', MylibraryRoute)

const PORT = process.env.PORT || 5000


// app.use('/', (req, res) => {
//     res.json({success: true, message:"selamat datang"})
// })

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


// routes


// const removeBooks=require('./routes/Books.routes')
// const { json } = require('body-parser')
// app.use('/api',removeBooks)
