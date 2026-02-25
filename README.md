# API Forge – Products REST API 🚀

A production-ready **REST API** built with **Node.js, Express, MongoDB, and Mongoose** that provides full CRUD (Create, Read, Update, Delete) operations for managing products.

This project is designed as a **backend portfolio service** to demonstrate real-world API design, database persistence, testing discipline, monitoring, and cloud deployment.

---

## 🌐 Live Deployment

**Base URL**  
https://rest-api-jeswanth.onrender.com

> Deployed on **Render** with a live **MongoDB Atlas** database.  
> Data persists across redeployments.

---

## ✨ Key Features

- 📦 Full CRUD operations for product management
- 🗄 Persistent storage using MongoDB Atlas
- 🔐 Security middleware with Helmet and Rate Limiting
- ⚙️ Environment-based configuration management
- 📊 Health check endpoint for deployment monitoring (`/api/health`)
- 🧪 Integration testing with Jest and Supertest
- 📘 Interactive API documentation with Swagger UI (`/api-docs`)
- 🚀 Production deployment on Render
- 🧼 Graceful shutdown handling (SIGTERM / SIGINT)
- ⏱ MongoDB connection timeout protection

---

## 🧠 API Design Overview

The API follows standard REST conventions:

- **POST** → Create a new product  
- **GET** → Retrieve products  
- **PUT** → Update an existing product by ID  
- **DELETE** → Remove a product by ID  

Each product is stored as a MongoDB document and assigned a unique `_id`, which is used for update and delete operations.

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Joi (validation)
- dotenv

### Testing
- Jest
- Supertest

### Documentation
- Swagger UI
- swagger-jsdoc (OpenAPI 3.0)

### Deployment
- Platform: Render
- Service Type: Web Service
- Runtime: Node.js

---

## 📘 Interactive API Documentation

Swagger UI is integrated for real-time API exploration and testing.

**Local:**  
http://localhost:3000/api-docs

**Production:**  
https://rest-api-jeswanth.onrender.com/api-docs

Documentation is generated using OpenAPI 3.0.

---

## 📊 Health Monitoring

A health check endpoint is available for deployment monitoring and uptime verification.

```http
GET /api/health
```
### Example response:

```
{
  "status": "ok",
  "uptime": 123.45,
  "environment": "production",
  "database": "connected",
  "timestamp": "2026-02-20T17:57:53.657Z"
}
```
Returns 503 if database connectivity fails.

## 📦 API Endpoints

### Get All Products

```
GET /api/products
```

### Create Product
```
POST /api/products
```

Example request body:

```
{
  "name": "Pixel 8",
  "price": 69999,
  "category": "electronics"
}
```
### Get Single Product
```
GET /api/products/:id
```
### Update Product
PUT /api/products/:id

Example request body:

```{
  "price": 64999
}
```

### Delete Product
```
DELETE /api/products/:id
```

## ⚙️ Environment Configuration

- Create a .env file in the project root (not committed):
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

## 🧪 Automated Testing

- Integration tests are implemented using Jest and Supertest.

Run tests locally:
```bash
npm test
```
* Test coverage includes:
  - Product creation endpoint (POST /api/products)
  - Product retrieval endpoint (GET /api/products)
  - Database cleanup between test runs
  - Environment isolation using NODE_ENV=test

## 🧪 Manual API Verification
- All endpoints were verified using Postman against both the local server and the live deployed service.
* Manual validation ensured:
  - CRUD operations behave correctly
  - MongoDB persistence across redeployments
  - API responses match expected structure
  - Error handling works under invalid input
  - Health endpoint responds correctly

## 📌 Notes
- Temporary development logs were removed after verification.
- Only startup and connection logs are retained.
- The application does not start unless MongoDB connects successfully.
- Production-safe shutdown logic ensures proper resource cleanup.

## 🔮 Future Enhancements
- JWT authentication & role-based authorization
- CI pipeline integration (GitHub Actions)
- In-memory MongoDB for isolated test database
- Expanded request/response schemas in Swagger
- API versioning strategy

## 👤 Author
**Jeswanth Reddy B.**
Aspiring Full-Stack Developer
Focused on building reliable, production-grade backend systems