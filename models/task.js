const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required:true,
        enum:['pending', 'completed', 'in-progress'],      //enum shows the strings that are only allowed and here shows the status of the task
    },
    duedate:{
        type:Date,
        required:true,
    },
    createdate:{
        type:Date,
        default: Date.now,  //default is the current date and time when the task is created
    }

});

const task = new mongoose.model('task',taskschema);

module.exports=task;