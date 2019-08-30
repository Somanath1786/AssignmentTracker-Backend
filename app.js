const { CLIENT_BASE_URL, NODE_ENV, PORT} = process.env
const express = require('express')
const app = express()

// Enable requests from local host
app.use(require('cors')({
    origin : CLIENT_BASE_URL,
    optionSuccessStatus : 200
}))

// Database connection
require('./db/connection')()

// Application-level Middleware
if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// For getting user profile add middleware to attach token to request
app.use(require('./api/middleware/set-token'))

// Routes
app.use('/api', require('./api/routes/auth'))
app.use('/api/user', require('./api/routes/user'))

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