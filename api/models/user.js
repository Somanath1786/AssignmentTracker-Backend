const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    emailAddress : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : Boolean
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('User', schema)