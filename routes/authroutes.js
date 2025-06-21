const express = require('express');
const{registeruser, loginuser} = require('../controller/userlogic');
const {create,getalltask,getalltask_id,updatetask_id,delete_id} = require('../controller/task');
const router = express.Router();
const auth = require("../middleware/auth");



// to reister the user
router.post('/regis',auth,registeruser);

//for the login details
router.get('/login',auth, loginuser);

//to create a task
router.post('/create',create);

//get all the routes 
router.get('/getalltask',getalltask);

//get all the routes 
router.get('/getalltask/:id',getalltask_id);

//update the task by id 
router.post('/update/:id',updatetask_id);

//to delete the taskby id 
router.post('/delete/:id',delete_id);



module.exports= router;
