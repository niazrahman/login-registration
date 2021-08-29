const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxLength : 30,
        unique : true
    },
    phone : {
        type : 'String',
        maxLength: 11
    },
    address : {
        type : 'String',
        required : true
    },
    nid : {
        type : 'String',
        required : true
    },
    role : {
        type : String,
        enum : ['farmer', 'buyer'],
        required : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : 'String',
        required : true,
        trim : true,
        minLength : 6
    },
    passwordConfrim : {
        type : String,
        // required : [true, 'Please confirm your password']
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User