import express from "express";
import dotenv from "dotenv";
import cors from "cors";                 // ✅ ADD THIS
import connectDB from "./config/db.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import "./config/mqtt.js";               // 🔹 START MQTT CLIENT

// load environment variables from .env
dotenv.config();

const app = express();

// ✅ ENABLE CORS (VERY IMPORTANT FOR REACT)
app.use(cors());

// middleware to read JSON body
app.use(express.json());

// connect to MongoDB
connectDB();

// sensor data & alert API routes
app.use("/api", sensorRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB is running");
});

// port from .env or fallback
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
