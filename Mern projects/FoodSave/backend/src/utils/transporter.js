import nodemailer from "nodemailer";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use another service provider
  auth: {
    user: process.env.EMAIL_USER, // From your .env file
    pass: process.env.EMAIL_PASS, // From your .env file
  },
});

export default transporter;
