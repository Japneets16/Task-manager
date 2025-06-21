const express= require('express');
const app= express();
require("./models/db");
require("./models/user");
require("./models/task");
const userroutes = require("./routes/authroutes");



app.use(express.json()); 

//to access the router
app.use('/api/auth', userroutes);

// app.post("/",(req,res)=>{
//     res.send("hi there");
// })


app.listen('3100',()=>{
    console.log("server is running ");

})