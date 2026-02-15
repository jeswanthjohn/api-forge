import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import productRoutes from "./routes/products.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

/* -------------------- Security Middleware -------------------- */

// Set secure HTTP headers
app.use(helmet());

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

/* -------------------- Logging Middleware -------------------- */

// Log HTTP requests (dev format in development, combined in production)
if (process.env.NODE_ENV === "production") {
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

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
