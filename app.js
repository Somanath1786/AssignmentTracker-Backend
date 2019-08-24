const {NODE_ENV, PORT} = process.env
const express = require('express')
const app = express()

// Enable requests from local host
app.use(require('cors')({
    origin : 'http://localhost:3000',
    optionSuccessStatus : 200
}))

// Database connection
require('./db/connection')()

// Application-level Middleware
if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// TODO: For getting user profile add middleware to attach token to request

// Routes
app.use('/api', require('./api/routes/auth'))



// Not Found Handler
app.use((req, res, next) => {
    const error = new Error(`Could not ${req.method} ${req.path}`)
    error.status = 404
    next(error)
})

// Error Handler
app.use((err, req, res, next) => {
    if (NODE_ENV === 'development') console.error(err)
    const { message, status } = err
    res.status(status).json({ status, message })
})

// Open Connection
const listener = () => console.log(`Listening on Port ${PORT}!`)
app.listen(PORT, listener)