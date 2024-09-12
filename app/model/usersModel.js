/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application User Model
 * Late Update: no  Update here
 */
import mongoose from "mongoose";

// Define Users Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phone: { type: String },
    email: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    otp: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// Define Users Model
const Users = mongoose.model("users", UserSchema);

// Export Users Model
export default Users;
