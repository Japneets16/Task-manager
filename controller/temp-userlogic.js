const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mailer");

// Temporary in-memory storage (for development only)
let users = [];
let userIdCounter = 1;

const registeruser = async (req, res) => {
  const body = req.body;

  // For validation
  const validate = z.object({
    name: z.string().min(4),
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().max(8),
  });

  // To validate the data with the body
  const result = validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  // After validation
  const { name, username, email, password } = result.data;

  // Check if user exists
  const existinguser = users.find((user) => user.email === email);
  if (existinguser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const newuser = {
      _id: userIdCounter++,
      name,
      username,
      email,
      password: hash,
    };

    // Save the new user to memory
    users.push(newuser);

    // Secret key for JWT
    const secretkey = process.env.JWT_SECRET || "jpsingh";

    // Generate JWT token
    const token = jwt.sign({ id: newuser._id }, secretkey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "user created successfully",
      token: token,
    });

    // Send welcome email (if configured)
    sendEmail(
      email,
      "Welcome to Task Manager",
      `Hi ${name}, welcome to the task manager app. You can now create your tasks and manage them easily. Happy tasking!`,
    );
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const loginuser = async (req, res) => {
  const body = req.body;

  // For validation
  const validate = z.object({
    email: z.string().email(),
    password: z.string().max(8),
  });

  // Validate data
  const result = validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  // After validation
  const { email, password } = result.data;

  // Find the user
  const existinguser = users.find((user) => user.email === email);

  // If user doesn't exist
  if (!existinguser) {
    return res.status(409).json({
      message: "user does not exist, create a new user",
    });
  }

  // Compare passwords
  bcrypt.compare(password, existinguser.password, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "server error",
      });
    }

    if (result) {
      // Secret key for JWT
      const secretkey = process.env.JWT_SECRET || "jpsingh";

      // Generate JWT token
      const token = jwt.sign({ id: existinguser._id }, secretkey, {
        expiresIn: "24h",
      });

      res.status(200).json({
        message: "login successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "invalid credentials",
      });
    }
  });
};

module.exports = {
  registeruser,
  loginuser,
};
