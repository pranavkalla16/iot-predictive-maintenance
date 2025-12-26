import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  vibration: {
    type: Number,
    required: true
  },
  pressure: {
    type: Number,
    required: true
  },

  // 🔹 AI-generated fields
  healthScore: {
    type: Number,
    required: false
  },
  riskLevel: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    required: false
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;
