const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jpsingh:jpsingh3205@cluster1.lcrcel4.mongodb.net/")
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log("db is not connected");
})

module.exports= mongoose;