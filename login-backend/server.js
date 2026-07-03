import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 5000;// Get port from environment variables or use 5000 as default
const app = express();// Create Express application
const router = express.Router();

//===MIDDLEWARE===
app.use(express.json());// Parse incoming JSON requests
// Enable CORS for frontend application
app.use(cors({
    origin: "http://localhost:5173",// Frontend URL
    credentials: true,// Allow cookies and credentials

}))
app.use(cookieParser());// Parse cookies from incoming requests

// Test Route
router.get("/", (req, res) => {
  res.send("Auth Route is working!");
});

//===DATABASE CONNECTION===
connectDB();

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default router;