const z= require('zod');
const task = require('../models/task');


const create = async(req,res)=>{

    const body= req.body;
    //for the validation

    const validate= z.object({
        title:z.string().min(1).max(15),
        description:z.string().min(5).max(50),
        status:z.string().min(3).max(15),
        duedate:z.string().min(10).max(10),
        createdate:z.string().min(10).max(10),
    });

    const result = validate.safeParse(body);
    if(!result.success){
        return res.json({
            message:"validation error",
            error: result.error.errors
        })
    }

    const{title, description, status, duedate, createdate} = result.data;

    //now create a task 
    const newtask = new task({
        title,
        description,
        status,
        duedate,
        createdate
    });

    //save the task 
    await newtask.save()
    .then(()=>{

        res.status(201).json({
            message:"task is created",
            task:newtask
        })
    }).catch((error)=>{
        res.status(500).json({
            message:"error in creating task",
            error:error.message
        });
    });
};




//to  get the all tasks
const getalltask= async(req,res)=>{
    try{
        
        //to filter on the basis if the status 
        const status  = req.query.status||'all';


        //if status is all then get all the tasks
        if(status === 'all'){
            const tasks = await task.find({});           // uses this in the filter {} to give all the tasks without the filter 
            return res.status(200).json({
                message:"all tasks are here",
                tasks:tasks
            });
        }
        //if status is not all then filter the tasks by status
         if(!['pending', 'completed', 'in-progress'].includes(status)){
            return res.status(400).json({
                message:"Invalid status"
            });
        }

        //if status is valid then get the tasks by status
        const tasks= await task.find({
            status:status
        });
    res.status(200).json({
        message:"all tasks are here",
        tasks:tasks
    });
} catch(err){
    res.status(500).json({
        message:"not getting all the task",
        task:err.message
    })
}   

};


//get all task by id 

const getalltask_id= async(req,res)=>{

    const _id = req.params.id;
    try{
        const tasks= await task.find({
             _id: _id
        });


    res.status(200).json({
        message:`task by ${_id}`,
        tasks:tasks
    });
} catch(err){
    res.status(500).json({
        message:`not getting task by ${_id}`,
        task:err.message
    })
}   

};



//to update the task by id
const updatetask_id= async(req,res)=>{
    //req body for the updation 
    const body = req.body;

    // for the validation 
    const validate= z.object({
        title:z.string().min(1).max(15),
        description:z.string().min(5).max(50),
        status:z.string().min(3).max(15),
        duedate:z.string().min(10).max(10),
        createdate:z.string().min(10).max(10),
    });

    const result = validate.safeParse(body);
    if(!result.success){
        return res.json({
            message:"validation error",
            error: result.error.errors
        })
    }

    const{title, description, status, duedate, createdate} = result.data;

    const _id= req.params.id;

    // now update the task 
    const updatetask = await task.findByIdAndUpdate({
        _id:_id
    }, 
        result.data,
        {new:true});
    
    if(updatetask){
        res.status(200).json({
            message:"task is updated",
            task: updatetask
        })
    }
    else{
        res.status(404).json({
            message:"task not found"
        });
    }

};



//to delete the task by id
const delete_id= async(req,res)=>{

    const _id = req.params.id;

    //now delete the task
    try{
        const tasks= await task.findOneAndDelete({
            
            _id:_id
        });

        // if there is not task with the id
        if(!tasks){
            return res.status(404).json({
                message:"task not found"
            });
        }

    res.status(200).json({
        message:'task is deleted',
        tasks:tasks
    });
} catch(err){
    res.status(500).json({
        message:'error in deleting task',
        task:err.message
    })
}   

};



//filter the task by the status 
// const filtertask_status= async(req,res)=>{

//     const status = req.body.status;
//     try{
//         const task= task.find({
//             status:status
//         })

//         if(status){
//             res.status(200).json({
//                 message:`task by ${status} status`,
//                 task:task
//             })
//         };
//     }catch(err){
//         res.status(500).json({
//             message:"error in filtering task by status",
//             task:err.message
//         });
//     }
// };


module.exports= { create, getalltask, getalltask_id ,updatetask_id, delete_id };




