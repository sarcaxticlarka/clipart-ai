require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", require("./routes/generate"));
app.use("/api/proxy", require("./routes/proxy"));
app.use("/api/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!", details: err.message });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server is running on http://0.0.0.0:${PORT}`);
});
