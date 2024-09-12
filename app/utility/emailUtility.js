/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application Email Sending Utility Functions
 * Late Update: no  Update here
 *
 */
// External Imports
import nodemailer from "nodemailer";

// Internal Imports
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_UN_AUTH,
  EMAIL_USER,
} from "../config/config.js";

export const sendEmail = (EmailTo, EmailSubject, EmailText) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_UN_AUTH,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Define Email Options
  const mailOptions = {
    from: `"Task Manager" <${EMAIL_USER}>`,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  // send Email
  transporter.sendMail(mailOptions);
};
