// using the nodemailer lib to send the emails to the user from the server

const nodemailer = require("nodemailer");

// Function to send email with dynamic recipient
const sendEmail = async (
  toEmail,
  subject = "Welcome to the Task Manager App",
  text = "Hi there, welcome to the task manager app. You can now create your tasks and manage them easily. Happy tasking!",
) => {
  try {
    // Get email credentials from environment variables or use defaults for development
    const emailUser = process.env.EMAIL_USER || "";
    const emailPass = process.env.EMAIL_PASS || "";

    // Only attempt to send email if credentials are provided
    if (!emailUser || !emailPass) {
      console.log("Email credentials not configured. Skipping email send.");
      return { success: false, message: "Email credentials not configured" };
    }

    // Create a transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass, // This pass is not the actual mail pass, it is the app password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: emailUser,
      to: toEmail,
      subject: subject,
      text: text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info.response);
    return {
      success: true,
      message: "Email sent successfully",
      info: info.response,
    };
  } catch (err) {
    console.log("Error in sending the email:", err.message);
    return { success: false, message: err.message };
  }
};

module.exports = sendEmail;
