import express from "express";
import SensorData from "../models/SensorData.js";
import Alert from "../models/Alert.js";

const router = express.Router();

/* =========================
   POST: Save sensor data
   (Manual / testing)
========================= */
router.post("/sensor-data", async (req, res) => {
  try {
    const sensorData = new SensorData(req.body);
    await sensorData.save();
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET: List all devices
========================= */
router.get("/devices", async (req, res) => {
  try {
    const devices = await SensorData.distinct("deviceId");
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET: Sensor data (by device)
   /api/sensor-data?deviceId=device1
========================= */
router.get("/sensor-data", async (req, res) => {
  try {
    const { deviceId } = req.query;

    const query = deviceId ? { deviceId } : {};

    const data = await SensorData.find(query)
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET: Alerts (by device)
   /api/alerts?deviceId=device1
========================= */
router.get("/alerts", async (req, res) => {
  try {
    const { deviceId } = req.query;

    const query = deviceId ? { deviceId } : {};

    const alerts = await Alert.find(query)
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
