// utils/notifier.js
import twilio from 'twilio';
import nodemailer from 'nodemailer';

// SMS (Twilio Free Tier - 1,000 SMS/month)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Email (Nodemailer - Free with Gmail)
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendNotification = async ({ phone, email, message }) => {
  try {
    // Try SMS first (Twilio)
    if (phone) {
      await twilioClient.messages.create({
        body: `FoodSave: ${message}`,
        from: process.env.TWILIO_PHONE,
        to: phone,
      });
      return;
    }

    // Fallback to Email
    if (email) {
      await mailTransport.sendMail({
        from: '"FoodSave" <noreply@foodsave.org>',
        to: email,
        subject: 'FoodSave Notification',
        text: message,
      });
    }
  } catch (error) {
    console.error('Notification failed:', error);
  }
};