const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    score : {
        type : Number,
        default : -1
    },
    maxScore : {
        type : Number,
        default : -1
    }},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = schema