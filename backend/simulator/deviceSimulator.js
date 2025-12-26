import mqtt from "mqtt";

const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081/mqtt";
const MQTT_TOPIC = "iot/predictive-maintenance/device1";

const client = mqtt.connect(MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("Device simulator connected to MQTT broker");

  setInterval(() => {
    const sensorData = {
      deviceId: "device1",
      temperature: Math.floor(Math.random() * 40) + 60,
      vibration: Number((Math.random() * 5).toFixed(2)),
      pressure: Math.floor(Math.random() * 30) + 20
    };

    client.publish(MQTT_TOPIC, JSON.stringify(sensorData));
    console.log("Published:", sensorData);
  }, 5000);
});
