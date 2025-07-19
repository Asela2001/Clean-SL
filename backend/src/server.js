import express from "express";
import jobRoutes from "./routes/jobRoutes.js";
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRouter);
 
connectDB(); //connect to Mongodb
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

