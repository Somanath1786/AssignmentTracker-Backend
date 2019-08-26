const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

router.get('/students' , async (req, res, next) =>{
    try {
        const payload = decodeToken(req.token)
        const query = { isAdmin : false }
        const fields = {'firstname' : 1, 'lastname' : 1, 'emailAddress' : 1}
        const students = await User.find(query, fields)
        const status = 200
        res.json({ status, students })
    } catch (e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

module.exports = router