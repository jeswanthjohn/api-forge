import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import config from "../config/index.js";
import Product from "../models/Product.js";

describe("Product API Integration Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(config.database.uri, {
      serverSelectionTimeoutMS: 5000,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  test("POST /api/products should create a product", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: "Test Product",
        price: 100,
        category: "electronics",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Test Product");
    expect(response.body.price).toBe(100);
  });

  test("GET /api/products should return products", async () => {
    await Product.create({
      name: "Existing Product",
      price: 200,
      category: "electronics",
    });

    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
  });
});