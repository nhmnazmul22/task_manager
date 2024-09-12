/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application Authentication Middleware
 * Late Update: no  Update here
 *
 */
// Internal Imports
import { tokenDecoded } from "../utility/tokenUtility.js";

const userAuth = (req, res, next) => {
  const token = req.headers["token"];
  // decoded the user token
  const decoded = tokenDecoded(token);
  if (decoded === null) {
    return res.status(401).json({ status: "Filed", message: "Unauthorize" });
  } else {
    const email = decoded.email;
    const user_id = decoded.user_id;
    req.headers.email = email;
    req.headers.user_id = user_id;
    next();
  }
};

export default userAuth;
