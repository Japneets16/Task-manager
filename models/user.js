const mongoose = require('mongoose');

const signupschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        requried: true,
    },
    password:{
        type: String,
        required:true,
    }
});

const signinschema = new mongoose.Schema({
    email:{
         type: String,
        requried: true
    },
    password:{
         type: String,
        required:true
    }
});

const signup= new mongoose.model('signup', signupschema);
const signin= new mongoose.model('signin', signinschema);


module.exports={
    signup,
    signin
};