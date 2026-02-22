import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import config from "./config/index.js";
import productRoutes from "./routes/products.js";
import healthRoutes from "./routes/health.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
let server;

/* -------------------- Security Middleware -------------------- */

app.use(helmet());

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

/* -------------------- Logging Middleware -------------------- */

if (config.env === "production") {
  app.use(morgan("combined"));
} else if (config.env !== "test") {
  app.use(morgan("dev"));
}

/* -------------------- General Middleware -------------------- */

app.use(cors());
app.use(express.json());

/* -------------------- Routes -------------------- */

app.use("/api/health", healthRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("REST API is running...");
});

/* -------------------- Global Error Handler -------------------- */

app.use(errorHandler);

/* -------------------- Graceful Shutdown -------------------- */

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  try {
    if (server) {
      server.close(() => {
        console.log("HTTP server closed.");
      });
    }

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");

    console.log("Shutdown complete. Exiting process.");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

/* -------------------- Database Connection -------------------- */

if (config.env !== "test") {
  mongoose
    .connect(config.database.uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("MongoDB connected successfully");

      server = app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    });
}

export default app;