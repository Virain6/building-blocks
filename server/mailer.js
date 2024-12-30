import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // App Password
  },
});

// Function to send email
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `Keystone Suppliers ${process.env.EMAIL_USER}`, // Sender's email
      to, // Recipient's email
      subject, // Email subject
      html: htmlContent, // HTML content of the email
      headers: {
        "X-Priority": "1", // Mark as high priority
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};
