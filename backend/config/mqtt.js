import mqtt from "mqtt";
import SensorData from "../models/SensorData.js";
import { predictHealth } from "../services/aiService.js";
import { generateAlert } from "../services/alertService.js"; // ✅ ADD THIS

const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081/mqtt";
const MQTT_TOPIC = "iot/predictive-maintenance/device1";

const client = mqtt.connect(MQTT_BROKER_URL, {
  reconnectPeriod: 3000
});

client.on("connect", () => {
  console.log("MQTT connected to broker");
  client.subscribe(MQTT_TOPIC);
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    // 🔹 AI prediction
    const prediction = predictHealth(data);

    // 🔹 Save sensor data + AI results
    const sensorData = new SensorData({
      deviceId: data.deviceId,
      temperature: data.temperature,
      vibration: data.vibration,
      pressure: data.pressure,
      healthScore: prediction.healthScore,
      riskLevel: prediction.risk
    });

    await sensorData.save();

    // 🔹 Generate alert if required
    await generateAlert(
      data.deviceId,
      prediction.healthScore,
      prediction.risk
    );

    console.log("MQTT data + AI + alert processed:", {
      ...data,
      healthScore: prediction.healthScore,
      riskLevel: prediction.risk
    });
  } catch (error) {
    console.error("Error processing MQTT data:", error.message);
  }
});

client.on("error", (err) => {
  console.error("MQTT error:", err.message);
});

export default client;
