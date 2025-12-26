// This service simulates AI-based failure prediction
// We keep it simple and realistic for interviews

export function predictHealth(sensorData) {
  const { temperature, vibration, pressure } = sensorData;

  let healthScore = 100;

  if (temperature > 85) healthScore -= 30;
  if (vibration > 4) healthScore -= 30;
  if (pressure > 45) healthScore -= 20;

  let risk = "LOW";
  if (healthScore < 70) risk = "MEDIUM";
  if (healthScore < 40) risk = "HIGH";

  return {
    healthScore,
    risk
  };
}
