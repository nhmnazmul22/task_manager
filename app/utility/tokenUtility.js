/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application JWT Token Managing Utility Functions
 * Late Update: no  Update here
 *
 */
// External Imports
import jwt from "jsonwebtoken";

// Internal Imports
import { JWT_EXPIRED_TIME, JWT_KEY } from "../config/config.js";

export const tokenEncoded = (email, user_id) => {
  // Implement JWT encoding logic here
  const KEY = JWT_KEY;
  const EXPIRED_TIME = { expiresIn: JWT_EXPIRED_TIME };
  const PAYLOAD = { email: email, user_id: user_id };

  const token = jwt.sign(PAYLOAD, KEY, EXPIRED_TIME);
  return token;
};

export const tokenDecoded = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded.user_id);
    return decoded;
  } catch (e) {
    return null;
  }
};
