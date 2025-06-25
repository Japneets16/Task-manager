const z = require("zod");
const { signup } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mailer");

const registeruser = async (req, res) => {
  const body = req.body;
  //for the validation
  const validate = z.object({
    name: z.string().min(4),
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().max(8),
  });

  //to validate the data with the body that it follows the conditions or not
  const result = validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  //after the validation put the user details in the resul t
  const { name, username, email, password } = result.data;

  //to find if user exists
  const existinguser = await signup.findOne({ email });
  if (existinguser) {
    res.status(409).json({
      message: "user already exists",
    });
  }

  try {
    // if the user does not exist then move forward and then hash the password
    //10 is the rounds the pswrd is hashed
    const hash = await bcrypt.hash(password, 10);

    //create a new user
    const newuser = new signup({
      name,
      username,
      email,
      password: hash,
    });
    //save the new user
    await newuser.save();

    //secret key for the jwt that is reqd in the jwt
    const secretkey = process.env.JWT_SECRET || "jpsingh";

    //jwt token are generated
    const token = jwt.sign({ id: newuser._id }, secretkey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "user created successfully",
      token: token,
    });

    //using the nodemailer lib to send the emails to the user from the server after the user is created
    sendEmail(
      email,
      "Welcome to Task Manager",
      `Hi ${name}, welcome to the task manager app. You can now create your tasks and manage them easily. Happy tasking!`,
    );
  } catch (err) {
    res.status(409).json({
      message: "server error is there",
    });
  }
};

const loginuser = async (req, res) => {
  const body = req.body;
  //for the validation
  const validate = z.object({
    email: z.string().email(),
    password: z.string().max(8),
  });

  //to validate the data with the body that it follows the conditions or not
  const result = await validate.safeParse(body);
  if (!result.success) {
    return res.json({
      message: "validation error",
      error: result.error.errors,
    });
  }

  //after the validation put the user details in the result
  const { email, password } = result.data;

  //o find the user exists then it will go to the sign up to check
  const existinguser = await signup.findOne({ email });

  //if the user does not exist
  if (!existinguser) {
    res.status(409).json({
      message: "user does not exit create a new user ",
    });
  }

  //now compare the passwords with the existing user password
  bcrypt.compare(password, existinguser.password, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "server error",
      });
    }
    if (result) {
      //secret key for the jwt that is reqd in the jwt
      const secretkey = process.env.JWT_SECRET || "jpsingh";
      //jwt token are generated
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
