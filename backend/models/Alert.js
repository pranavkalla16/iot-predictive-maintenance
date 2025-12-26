import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["CRITICAL", "WARNING"],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
