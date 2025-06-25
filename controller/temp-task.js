const z = require("zod");

// Temporary in-memory storage (for development only)
let tasks = [];
let taskIdCounter = 1;

const create = async (req, res) => {
  const body = req.body;

  // For validation
  const validate = z.object({
    title: z.string().min(1).max(15),
    description: z.string().min(5).max(50),
    status: z.string().min(3).max(15),
    duedate: z.string().min(10).max(10),
    createdate: z.string().min(10).max(10),
  });

  const result = validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  const { title, description, status, duedate, createdate } = result.data;

  // Create new task
  const newtask = {
    _id: taskIdCounter++,
    title,
    description,
    status,
    duedate,
    createdate,
  };

  // Save task to memory
  tasks.push(newtask);

  res.status(201).json({
    message: "task is created",
    task: newtask,
  });
};

// Get all tasks
const getalltask = async (req, res) => {
  try {
    const status = req.query.status || "all";

    // If status is all then get all tasks
    if (status === "all") {
      return res.status(200).json({
        message: "all tasks are here",
        tasks: tasks,
      });
    }

    // If status is not all then filter tasks by status
    if (!["pending", "completed", "in-progress"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Filter tasks by status
    const filteredTasks = tasks.filter((task) => task.status === status);

    res.status(200).json({
      message: "all tasks are here",
      tasks: filteredTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "not getting all the tasks",
      error: err.message,
    });
  }
};

// Get task by id
const getalltask_id = async (req, res) => {
  const _id = parseInt(req.params.id);

  try {
    const task = tasks.find((task) => task._id === _id);

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    res.status(200).json({
      message: `task by ${_id}`,
      tasks: [task],
    });
  } catch (err) {
    res.status(500).json({
      message: `not getting task by ${_id}`,
      error: err.message,
    });
  }
};

// Update task by id
const updatetask_id = async (req, res) => {
  const body = req.body;
  const _id = parseInt(req.params.id);

  // For validation
  const validate = z.object({
    title: z.string().min(1).max(15),
    description: z.string().min(5).max(50),
    status: z.string().min(3).max(15),
    duedate: z.string().min(10).max(10),
    createdate: z.string().min(10).max(10),
  });

  const result = validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  // Find and update task
  const taskIndex = tasks.findIndex((task) => task._id === _id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "task not found",
    });
  }

  // Update the task
  tasks[taskIndex] = { ...tasks[taskIndex], ...result.data };

  res.status(200).json({
    message: "task is updated",
    task: tasks[taskIndex],
  });
};

// Delete task by id
const delete_id = async (req, res) => {
  const _id = parseInt(req.params.id);

  try {
    const taskIndex = tasks.findIndex((task) => task._id === _id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    // Remove task from array
    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      message: "task is deleted",
      tasks: deletedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "error in deleting task",
      error: err.message,
    });
  }
};

module.exports = {
  create,
  getalltask,
  getalltask_id,
  updatetask_id,
  delete_id,
};
