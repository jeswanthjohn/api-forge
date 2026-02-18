import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import config from "./config/index.js";
import productRoutes from "./routes/products.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* -------------------- Security Middleware -------------------- */

// Secure HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

/* -------------------- Logging Middleware -------------------- */

if (config.env === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/* -------------------- General Middleware -------------------- */

app.use(cors());
app.use(express.json());

/* -------------------- Routes -------------------- */

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("REST API is running...");
});

/* -------------------- Global Error Handler -------------------- */

app.use(errorHandler);

/* -------------------- Database Connection -------------------- */

mongoose
  .connect(config.database.uri)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
