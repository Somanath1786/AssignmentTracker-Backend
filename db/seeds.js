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
            firstname : 'Admin',
            lastname : 'Default',
            emailAddress : 'admin@email.com',
            password : bcrypt.hashSync('password', 10),
            isAdmin : true
        },
        {
            firstname : 'Student',
            lastname : 'Default',
            emailAddress : 'student@email.com',
            password : bcrypt.hashSync('password', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1',
                link : 'https://www.github.com/',
                score : 95,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2',
                link : 'https://www.github.com/',
                score : 99,
                maxScore : 100
            },
            {
                title : 'Assignment 3',
                description : 'This is the description for Assignment 3',
                link : 'https://www.github.com/'
            }]
        },
        {
            firstname : 'Student',
            lastname : '1',
            emailAddress : 'student1@email.com',
            password : bcrypt.hashSync('password1', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 1',
                link : 'https://www.github.com/student1',
                score : 95,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 1',
                link : 'https://www.github.com/student1',
                score : 99,
                maxScore : 100
            },
            {
                title : 'Assignment 3',
                description : 'This is the description for Assignment 3 - Student 1',
                link : 'https://www.github.com/student1'
            }]
        },
        {
            firstname : 'Student',
            lastname : '2',
            emailAddress : 'student2@email.com',
            password : bcrypt.hashSync('password2', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 2',
                link : 'https://www.github.com/student2',
                score : 77,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 2',
                link : 'https://www.github.com/student2'
            }]
        },
        {
            firstname : 'Student',
            lastname : '3',
            emailAddress : 'student3@email.com',
            password : bcrypt.hashSync('password3', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 3',
                description : 'This is the description for Assignment 3 - Student 3',
                link : 'https://www.github.com/student3',
                score : 92,
                maxScore : 100
            },
            {
                title : 'Assignment 3',
                description : 'This is the description for Assignment 3 - Student 3',
                link : 'https://www.github.com/student3'
            }]
        },
        {
            firstname : 'Student',
            lastname : '4',
            emailAddress : 'student4@email.com',
            password : bcrypt.hashSync('password4', 10),
            isAdmin : false,
            assignments : [
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 4',
                link : 'https://www.github.com/student4'
            }]
        },
        {
            firstname : 'Student',
            lastname : '5',
            emailAddress : 'student5@email.com',
            password : bcrypt.hashSync('password5', 10),
            isAdmin : false,
            assignments : [
            {
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 5',
                link : 'https://www.github.com/student5'
            }]
        },
        {
            firstname : 'Student',
            lastname : '6',
            emailAddress : 'student6@email.com',
            password : bcrypt.hashSync('password6', 10),
            isAdmin : false,
            assignments : [
            {
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 6',
                link : 'https://www.github.com/student6',
                score : 57,
                maxScore : 100
            }]
        },
        {
            firstname : 'Student',
            lastname : '7',
            emailAddress : 'student7@email.com',
            password : bcrypt.hashSync('password7', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 7',
                link : 'https://www.github.com/student7',
                score : 99,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 7',
                link : 'https://www.github.com/student7',
                score : 99,
                maxScore : 100
            }]
        },
        {
            firstname : 'Student',
            lastname : '8',
            emailAddress : 'student8@email.com',
            password : bcrypt.hashSync('password8', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 8',
                link : 'https://www.github.com/student8',
                score : 56,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 8',
                link : 'https://www.github.com/student8',
                score : 89,
                maxScore : 100
            },
            {
                title : 'Assignment 3',
                description : 'This is the description for Assignment 3 - Student 1',
                link : 'https://www.github.com/student1'
            }]
        },
        {
            firstname : 'Student',
            lastname : '9',
            emailAddress : 'student9@email.com',
            password : bcrypt.hashSync('password9', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 9',
                link : 'https://www.github.com/student9',
                score : 85,
                maxScore : 100
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 9',
                link : 'https://www.github.com/student9'
            }]
        },
        {
            firstname : 'Student',
            lastname : '10',
            emailAddress : 'student10@email.com',
            password : bcrypt.hashSync('password10', 10),
            isAdmin : false,
            assignments : [{
                title : 'Assignment 1',
                description : 'This is the description for Assignment 1 - Student 10',
                link : 'https://www.github.com/student10'
            },
            {
                title : 'Assignment 2',
                description : 'This is the description for Assignment 2 - Student 9',
                link : 'https://www.github.com/student9'
            }]
        }

    ])
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.length} records created.`)
    return mongoose.disconnect()
})