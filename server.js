import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Routes -------------------- */
app.use("/api/products", productRoutes);


import errorHandler from './middleware/errorHandler.js';

app.use(errorHandler);


/* -------------------- Root Route -------------------- */
app.get("/", (req, res) => {
  res.send("REST API is running...");
});

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
