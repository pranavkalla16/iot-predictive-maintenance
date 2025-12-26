import Alert from "../models/Alert.js";

export async function generateAlert(deviceId, healthScore, riskLevel) {
  if (riskLevel === "HIGH") {
    await Alert.create({
      deviceId,
      level: "CRITICAL",
      message: "High failure risk detected. Immediate attention required."
    });
  }

  if (riskLevel === "MEDIUM") {
    await Alert.create({
      deviceId,
      level: "WARNING",
      message: "Potential issue detected. Monitor device closely."
    });
  }
}
