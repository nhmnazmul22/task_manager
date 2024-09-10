/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application app configuration
 * Late Update: no  Update here
 *
 */

// External Imports
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";

// Internal Imports
import {
  DATABASE_URI,
  MAX_JSON_FILE,
  PORT,
  REQUEST_LIMIT,
  REQUEST_TIME,
  URL_ENCODED,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";

// initial express app
const app = express();

// Default Middleware use
app.use(cors());
app.use(express.json({ limit: MAX_JSON_FILE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(helmet());

// Request Rate Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, limit: REQUEST_LIMIT });
app.use(limiter);

// Application Cache
app.set("etag", WEB_CACHE);

// Database connection
mongoose
  .connect(DATABASE_URI, { autoIndex: true })
  .then(() => console.log("MongoDB Database Connection Successful"))
  .catch(() => console.log("An Error ocurred on Database Connection"));

app.use("/api", router);

// App Listener
app.listen(PORT, () => {
  console.log("Server Run Successful" + PORT);
});
