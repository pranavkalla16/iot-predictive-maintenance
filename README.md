📊 Predictive Maintenance Dashboard for IoT Devices
📌 Project Overview

This project is a Predictive Maintenance Dashboard for IoT Devices designed to ingest real-time sensor data, perform AI-based health prediction, generate alerts, and visualize equipment status through an interactive web dashboard.

The system simulates an industrial IoT monitoring platform, integrating real-time data ingestion, time-series data storage, AI inference, and live visualization.

🎯 Objectives

Ingest real-time IoT sensor data

Predict equipment health using AI logic

Detect potential failures early

Display system health and alerts in real time

Support monitoring of multiple devices

🚀 Key Features

Real-time data ingestion via MQTT

REST APIs for sensor data and alerts

AI-based health score prediction

Automatic alert generation (Warning / Critical)

Multi-device support

Interactive React dashboard

Live charts and visual analytics

3D Health Gauge visualization

Dark mode support

Time-series data storage using MongoDB

🛠️ Technology Stack
Frontend

React.js

Recharts (data visualization)

Custom CSS (3D gauge, dark mode)

Backend

Node.js

Express.js

MongoDB (Mongoose)

MQTT.js

OpenAI API (AI inference logic)

📂 Project Structure
iot-predictive-maintenance/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── mqtt.js
│   ├── models/
│   │   ├── SensorData.js
│   │   └── Alert.js
│   ├── routes/
│   │   └── sensorRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── simulator/
│   │   └── deviceSimulator.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Prerequisites

Node.js (v18 or higher)

MongoDB Atlas account

Internet connection (for MQTT broker)

2️⃣ Clone the Repository
git clone <your-repository-url>
cd iot-predictive-maintenance

3️⃣ Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string


Start the backend server:

npm start


Backend runs at:

http://localhost:5000

4️⃣ Start IoT Device Simulator

Open a new terminal:

cd backend/simulator
node deviceSimulator.js


This simulates IoT devices publishing sensor data using MQTT.

5️⃣ Frontend Setup

Open another terminal:

cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

📡 API Endpoints
🔹 Get Available Devices
GET /api/devices

🔹 Get Sensor Data (By Device)
GET /api/sensor-data?deviceId=device1

🔹 Get Alerts (By Device)
GET /api/alerts?deviceId=device1

🤖 AI Prediction Logic

Incoming sensor readings are processed in real time

A health score (0–100) is computed for each reading

Risk levels are categorized as:

LOW

MEDIUM

HIGH

Alerts are generated automatically for abnormal conditions

📊 Dashboard Capabilities

Device selection dropdown

Real-time sensor metrics

Temperature trend visualization

Risk distribution analysis

3D Health Gauge

Live alert panel with severity levels

Dark mode for improved usability

🧪 Testing the Application

Start backend server

Run MQTT device simulator

Start frontend dashboard

Observe live data updates and alerts

📌 Notes

MongoDB is used as a time-series data store

Public MQTT broker used: test.mosquitto.org

Authentication is intentionally omitted as it is outside the task scope

👨‍💻 Author

Pranav
B.Tech Computer Science (Final Year)
Focus Areas: MERN Stack | AI/ML | IoT Systems