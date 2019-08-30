const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

router.get('/students' , async (req, res, next) =>{
    try {
        const payload = decodeToken(req.token)
        const query = { isAdmin : false }
        var students=[];
        console.log(req.query)
        const response = await User.find(query)
        for(var i = 0; i < response.length; i++)
        {
            var student = response[i];
            var totalScore = 0;
            var totalMaxScore = 0;
            for(var j = 0; j < student.assignments.length; j++)
            {
                if (student.assignments[j].score !== -1 && student.assignments[j].maxScore !== -1)
                {
                    totalScore+= student.assignments[j].score
                    totalMaxScore+= student.assignments[j].maxScore
                }
            }

            if (req.query.minScore && req.query.maxScore) {
                console.log(totalScore, req.query.minScore, req.query.maxScore)
                if ((totalScore > req.query.minScore) && (totalScore < req.query.maxScore)) {
                    console.log(student.firstname, student.lastname, student.emailAddress, totalScore, totalMaxScore)
                    students.push({ "firstname" : student.firstname,
                            "lastname" : student.lastname,
                            "emailAddress" : student.emailAddress,
                            "score" : totalScore,
                            "maxScore" : totalMaxScore
                            })
                }
            }
            else {
                console.log(student.firstname, student.lastname, student.emailAddress, totalScore, totalMaxScore)
                students.push({ "firstname" : student.firstname,
                                "lastname" : student.lastname,
                                "emailAddress" : student.emailAddress,
                                "score" : totalScore,
                                "maxScore" : totalMaxScore
                                })
            }
        }

        const status = 200
        res.json({ status, students })
    } catch (e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

router.get('/admin/assignments/' , async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        const user = await User.findById(payload.id)
        if (user.isAdmin === false)
        {
            throw('You are not allowed to access this route')
        }
        const query = { isAdmin : false }
        var assignments = []
        const response = await User.find(query)

        for(var i = 0; i < response.length; i++)
        {
            var student = response[i];
            var score = 0;
            var maxScore = 0
            for (var j = 0; j < student.assignments.length; j++)
            {
                if (req.query.graded === 'true')
                {
                    if (student.assignments[j].score !== -1 && student.assignments[j].maxScore !== -1)
                    {
                        score = student.assignments[j].score
                        maxScore = student.assignments[j].maxScore
                        assignments.push({ "firstname" : student.firstname,
                                            "lastname" : student.lastname,
                                            "userId" : student._id,
                                            "_id" : student.assignments[j]._id,
                                            "title" : student.assignments[j].title,
                                            "link" : student.assignments[j].link,
                                            "description" : student.assignments[j].description,
                                            "score" : student.assignments[j].score,
                                            "maxScore" : student.assignments[j].maxScore
                                        })
                    }
                }
                if (req.query.graded === 'false')
                {
                    if (student.assignments[j].score === -1 && student.assignments[j].maxScore === -1)
                    {
                        assignments.push({ "firstname" : student.firstname,
                                            "lastname" : student.lastname,
                                            "userId" : student._id,
                                            "_id" : student.assignments[j]._id,
                                            "title" : student.assignments[j].title,
                                            "link" : student.assignments[j].link,
                                            "description" : student.assignments[j].description
                                        })
                    }
                }
            }
        }
        const status = 200
        res.json({ status, assignments })

    } catch (e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})


router.get('/:userId/assignments', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        const fields = {'assignments' : 1, '_id' : 0}
        const allAssignments = await User.findById(req.params.userId, fields)
        const status = 200
        res.json({status, allAssignments})
    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

router.get('/:userId/assignments/:assignmentId', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        const assignment = await User.find({"_id" : req.params.userId},
                                            {assignments : {$elemMatch : {_id :  req.params.assignmentId}}})
        const status = 200
        res.json({status, assignment})
    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

router.patch('/admin/assignments/:assignmentId', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        var user = await User.find({"_id" : req.body.userId})
        const student = user[0]
        console.log(req.params.assignmentId)
        console.log(student)
        for(var i = 0; i < student.assignments.length; i++)
        {
            if (JSON.stringify(student.assignments[i]._id) === JSON.stringify(req.params.assignmentId))
            {
                console.log('Found assignment')
                student.assignments[i].score = req.body.score
                student.assignments[i].maxScore = req.body.maxScore
                break;
            }
        }

        const saveResponse = await student.save()
        status = 200
        const respone = 'Scores Update Successful'

        res.json({status, respone})
    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

router.patch('/:userId/assignments/new', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        var assignment = {title : req.body.title, link : req.body.link, description : req.body.description}
        var user = await User.update({_id : req.params.userId}, {$push : {assignments : assignment}})
        const status = 200
        const response = 'Success'
        res.json({status, response})
    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

router.patch('/:userId/assignments/:assignmentId', async (req, res, next) => {
    try {

        const payload = decodeToken(req.token)
        var user = await User.find({"_id" : req.params.userId})

        for (var i = 0; i < user[0].assignments.length; i++)
        {
            if (JSON.stringify(user[0].assignments[i]._id) === JSON.stringify(req.params.assignmentId))
            {
                user[0].assignments[i].title = req.body.title
                user[0].assignments[i].link = req.body.link
                user[0].assignments[i].description = req.body.description

                break;
            }
        }

        user = await user[0].save()
        const status = 200
        const response = 'Update success'
        res.json({status, response})

    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }

})

router.delete('/:userId/assignments/:assignmentId', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        const response = await User.updateOne({_id: req.params.userId}, {$pull: {assignments : {_id : req.params.assignmentId}}}, {new : true})
        const status = 200
        res.json({status, response})
    } catch(e) {
        console.error(e)
        const error = new Error('You are not authorized to access this route.')
        error.status = 401
        next(error)
    }
})

module.exports = router