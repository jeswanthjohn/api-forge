import dotenv from "dotenv";

dotenv.config();

/**
 * Centralized configuration management
 * All environment variables are accessed from here
 */

const config = {
  env: process.env.NODE_ENV || "development",

  port: process.env.PORT || 5000,

  database: {
    uri: process.env.MONGODB_URI,
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
};

export default config;
