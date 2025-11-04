// utils/sendEmail.js
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send an email using SendGrid
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - HTML content
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.ADMIN_EMAIL, // verified sender
      subject,
      html,
    };
    await sgMail.send(msg);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error.response?.body || error.message);
  }
};
