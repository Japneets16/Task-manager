// using the nodemailer lib to send the emails to the user from the server 

const nodemailer= require("nodemailer");

//create a transporter
const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'',
        pass:''            //this pass is not the actual mail pass , it is the app password 
    }
});


//set up the email address and the content

const mailoptions={
    from:'',
    to:'',
    subject:'welcome to the task manager app',
    text:'hi there, welcome to the task manager app. you can now create your tasks and manage them easily. happy tasking!'
};

//send the email

const mail=transporter.sendMail(mailoptions,(err,info)=>{

    if(err){
        console.log("error in sending the email", err.message);
    }
    else{
        console.log("email sent successfully", info.response);
    }
});

module.exports= mail;