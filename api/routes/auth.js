const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

router.post('/login', async(req, res, next) => {
    const {emailAddress, password } = req.body
    const user = await User.findOne({ emailAddress })
    if (user)
    {
        const valid = await bcrypt.compare(password, user.password)
        if (valid)
        {
            const status = 200
            const response = 'You have successfully logged in.'
            const token = generateToken(user._id)
            return res.status(status).json({ status, response, token})
        }
    }

    const message = 'Username or password incorect. Please check credentials and try again'
    const error = Error(message)
    error.status = 401
    next(error)
})

router.post('/signup', async (req, res, next) => {
    const { firstname, lastname, emailAddress, password } = req.body
    const rounds = 10
    const hashed = await bcrypt.hash(password, rounds)

    const alreadyExists = await User.findOne({ emailAddress })
    if (alreadyExists) {
      const error = new Error(`Email '${emailAddress}' is already taken.`)
      error.status = 400

      return next(error)
    }

    const status = 201
    const user = await User.create({ firstname, lastname, emailAddress, password: hashed })
    const token = generateToken(user._id)
    res.status(status).json({ status, token })
  })

module.exports = router;