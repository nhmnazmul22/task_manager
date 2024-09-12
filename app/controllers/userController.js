/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application User Controller Functions
 * Late Update: 10/09/2024
 *
 */

// Internal Imports
import Users from "../model/usersModel.js";
import { sendEmail } from "../utility/emailUtility.js";
import { tokenEncoded } from "../utility/tokenUtility.js";

export const userRegistration = async (req, res) => {
  try {
    // User Registration Logic Here
    const reqBody = req.body;
    await Users.create(reqBody);
    return res.json({
      status: "Successful",
      message: "User Registration Successful",
    });
  } catch (err) {
    return res.json({ status: "Field", message: err.toString() });
  }
};

export const userLogin = async (req, res) => {
  try {
    const reqBody = req.body;
    // Find user with req Body data
    const data = await Users.findOne(reqBody);

    if (data === null) {
      return res.json({
        status: "Failed",
        message: "Invalid Email or Password",
      });
    } else {
      // JWT Token Generation Logic Here
      const token = tokenEncoded(data.email, data._id);
      return res.json({
        status: "Successful",
        message: "Login Successful",
        data: { token: token },
      });
    }
  } catch (err) {
    return res.json({
      status: "Failed",
      message: err.toString(),
    });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user_id = req.headers["user_id"];
    const skipItems = { password: 0, otp: 0 };
    const data = await Users.findOne({ _id: user_id }, skipItems);
    return res.json({
      status: "Successful",
      data: data,
    });
  } catch (err) {
    return res.json({ status: "Failed", message: err.toString() });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user_id = req.headers["user_id"];
    const reqBody = req.body;
    await Users.updateOne({ _id: user_id }, reqBody);
    return res.json({
      status: "Successful",
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    return res.json({
      status: "Field",
      message: err.toString(),
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await Users.findOne({ email: email });
    if (data === null) {
      return res.json({
        status: "Failed",
        message: "Invalid email or Email not exits on Database",
      });
    } else {
      const code = Math.floor(100000 + Math.random() * 999999);
      const EmailTo = email;
      const EmailSubject = "Task Manager Password Reset OTP";
      const EmailText = code;
      // Send the otp in the user mail
      await sendEmail(EmailTo, EmailSubject, EmailText);
      // update the user data
      await Users.updateOne({ email: email }, { otp: code });
      return res.json({
        status: "Successful",
        message: "OTP Send on your email, Please Check your E-mail",
      });
    }
  } catch (err) {
    return res.json({
      status: "Failed",
      message: err.toString(),
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const reqBody = req.body;
    const email = reqBody["email"];
    const otpCode = reqBody["otp"];
    const data = await Users.findOne({ email: email, otp: otpCode });
    if (data === null) {
      return res.json({
        status: "Field",
        message: "OTP Code Verification filed",
      });
    } else {
      return res.json({
        status: "Successful",
        message: "OTP Code Verification Successful",
      });
    }
  } catch (err) {
    return res.json({
      status: "Field",
      message: err.toString(),
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = Users.findOne({
      email: reqBody["email"],
      otp: reqBody["otp"],
    });
    if (data === null) {
      return res.json({
        status: "Failed",
        message: "Invalid OTP or Email",
      });
    } else {
      await Users.updateOne(
        { email: reqBody["email"] },
        { password: reqBody["newPassword"] }
      );
      return res.json({
        status: "Successful",
        message: "Password Reset Successful",
      });
    }
  } catch (err) {
    return res.json({
      status: "Failed",
      message: err.toString(),
    });
  }
};
