import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  /* =========================
     FETCH DEVICES
  ========================= */
  const fetchDevices = async () => {
    const res = await fetch("http://localhost:5000/api/devices");
    const data = await res.json();
    setDevices(data);
    setSelectedDevice(data[0]); // default device
  };

  /* =========================
     FETCH DATA BY DEVICE
  ========================= */
  const fetchData = async (deviceId) => {
    if (!deviceId) return;

    const sensorRes = await fetch(
      `http://localhost:5000/api/sensor-data?deviceId=${deviceId}`
    );
    const alertRes = await fetch(
      `http://localhost:5000/api/alerts?deviceId=${deviceId}`
    );

    setSensorData(await sensorRes.json());
    setAlerts(await alertRes.json());
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    fetchData(selectedDevice);
    const interval = setInterval(() => fetchData(selectedDevice), 5000);
    return () => clearInterval(interval);
  }, [selectedDevice]);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const latest = sensorData[0] || {};
  const health = latest.healthScore ?? 0;
  const needleRotation = -90 + (health / 100) * 180;

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Predictive Maintenance Dashboard</h1>
          <p>Multi-Device IoT Monitoring & AI Prediction</p>
        </div>

        <div>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="device-select"
          >
            {devices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Device</h3>
          <p>{selectedDevice}</p>
        </div>

        <div className="kpi-card">
          <h3>Temperature</h3>
          <p>{latest.temperature ?? "--"} °C</p>
        </div>

        <div className="kpi-card">
          <h3>Health</h3>

          <div className="gauge-wrapper">
            <div className="gauge">
              <div className="gauge-fill" />
              <div
                className="gauge-needle"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              />
              <div className="gauge-center" />
            </div>
          </div>

          <div className="gauge-label">{health}%</div>
        </div>

        <div className="kpi-card">
          <h3>Alerts</h3>
          <p>{alerts.length}</p>
        </div>
      </div>

      {/* ALERTS */}
      <div className="section">
        <h2>Active Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts 🎉</p>
        ) : (
          alerts.map((a) => (
            <div
              key={a._id}
              className={`alert-card ${
                a.level === "CRITICAL"
                  ? "alert-critical"
                  : "alert-warning"
              }`}
            >
              <strong>{a.level}</strong> — {a.message}
            </div>
          ))
        )}
      </div>

      {/* CHARTS */}
      <div className="chart-grid">
        <div className="section">
          <h2>Temperature Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[...sensorData].reverse()}>
              <XAxis hide />
              <YAxis />
              <Tooltip />
              <Line dataKey="temperature" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="section">
          <h2>Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { risk: "LOW", count: sensorData.filter(d => d.riskLevel === "LOW").length },
                { risk: "MEDIUM", count: sensorData.filter(d => d.riskLevel === "MEDIUM").length },
                { risk: "HIGH", count: sensorData.filter(d => d.riskLevel === "HIGH").length }
              ]}
            >
              <XAxis dataKey="risk" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
