// routes/health.js

import express from "express";
import mongoose from "mongoose";
import config from "../config/index.js";

const router = express.Router();

/**
 * Health Check Endpoint
 * Used for deployment monitoring (Render, uptime checks)
 */
router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;

  // MongoDB connection states:
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting

  const databaseStatus =
    dbState === 1 ? "connected" : "disconnected";

  const status = dbState === 1 ? "ok" : "degraded";

  const healthData = {
    status,
    uptime: process.uptime(),
    environment: config.env,
    database: databaseStatus,
    timestamp: new Date().toISOString(),
  };

  if (dbState !== 1) {
    return res.status(503).json(healthData);
  }

  res.status(200).json(healthData);
});

export default router;