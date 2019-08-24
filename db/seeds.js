const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, {useNewUrlParser : true})

    // First delete all existing records
    await User.deleteMany()
    return User.create([
        {
            firstname : 'student',
            lastname : 'default',
            emailAddress : 'student@email.com',
            password : bcrypt.hashSync('password', 10),
            isAdmin : false
        },
        {
            firstname : 'admin',
            lastname : 'default',
            emailAddress : 'admin@email.com',
            password : bcrypt.hashSync('password', 10),
            isAdmin : true
        }
    ])
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.length} records created.`)
    return mongoose.disconnect()
})