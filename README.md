# API Forge – Products REST API 🚀

A production-oriented REST API built with **Node.js, Express, MongoDB, and Mongoose** that provides full CRUD (Create, Read, Update, Delete) operations for managing products.

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
- 🛡 Request sanitization to reduce NoSQL injection risks
- 🔍 MongoDB ObjectId validation for safer API querying
- 📄 Standardized API response structure across all endpoints
- 📚 Pagination metadata with boundary validation
- ⚠️ Global handling for unhandled promise rejections and uncaught exceptions
- 🚫 Duplicate product prevention using compound unique indexes
- ↕️ Strict sorting field validation for predictable query behavior

---

## 🧠 API Design Overview

The API follows standard REST conventions:

- **POST** → Create a new product  
- **GET** → Retrieve products  
- **PUT** → Update an existing product by ID  
- **DELETE** → Remove a product by ID  

Each product is stored as a MongoDB document and assigned a unique `_id`, which is used for update and delete operations.

---

## 🗄 Database Design

Products are stored as MongoDB documents using Mongoose schemas.

The schema includes:

* Validation constraints for required fields
* Length validation for text fields
* Numeric validation for price values
* Compound indexing to optimize common query patterns
* Duplicate product prevention through database-level constraints

Indexes are applied to frequently queried fields to improve filtering and sorting performance as dataset size grows.


---

## 🛡 Security & Reliability Features

The API includes several production-oriented safeguards and defensive coding practices:

- Helmet middleware for secure HTTP headers
- Rate limiting to reduce abusive traffic patterns
- Request sanitization against common NoSQL injection attempts
- Environment variable validation during application startup
- MongoDB ObjectId validation before database queries
- Graceful shutdown handling for server and database connections
- Global handling for unhandled promise rejections and uncaught exceptions
- Query validation for pagination and sorting parameters
- Duplicate product prevention using compound database indexes

These protections improve API reliability, predictability, and operational safety in production-like environments.

---

## ⚠️ Error Handling Strategy

The API uses centralized error handling to provide predictable responses across all endpoints.

Handled scenarios include:

* Invalid MongoDB ObjectIds
* Validation failures
* Duplicate product creation attempts
* Invalid pagination parameters
* Invalid sorting parameters
* Missing resources (404)
* Internal server errors

Operational errors return structured responses while unexpected failures are safely handled through global error middleware.

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

---

## 📦 API Endpoints

## 📄 Standard API Response Structure

Successful responses follow a consistent structure:

```json
{
  "status": "success",
  "message": "Products fetched successfully",
  "data": {}
}
```

Error responses follow this structure:

```json
{
  "status": "error",
  "message": "Invalid product ID"
}
```

### Get All Products

```http
GET /api/products
```
### Supported Query Parameters

| Query Parameter | Description |
|---|---|
| `minPrice` | Filter products by minimum price |
| `maxPrice` | Filter products by maximum price |
| `category` | Filter products by category (case-insensitive) |
| `sort` | Sort results (`price`, `-price`, `createdAt`, `-createdAt`) |
| `page` | Pagination page number |
| `limit` | Number of products per page (max 100) |

### Example

```http
GET /api/products?category=electronics&sort=-price&page=1&limit=5
```

### Pagination Response Example

```json
{
  "status": "success",
  "message": "Products fetched successfully",
  "data": {
    "products": [],
    "pagination": {
      "totalProducts": 50,
      "totalPages": 10,
      "currentPage": 1,
      "pageSize": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```


### Create Product

```http
POST /api/products
```

Example request body:

```json
{
  "name": "Pixel 8",
  "price": 69999,
  "category": "electronics"
}
```
### Get Single Product
```http
GET /api/products/:id
```
### Update Product

```http
PUT /api/products/:id
```

Example request body:

```json
{
  "price": 64999
}
```

### Delete Product
```http
DELETE /api/products/:id
```

## ⚙️ Environment Configuration

- Create a .env file in the project root (not committed):
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

## ▶️ Local Development Setup

Clone the repository:

```bash
git clone https://github.com/jeswanthjohn/api-forge.git
```

Navigate into the project directory:

```bash
cd api-forge
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
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

### Testing Approach

Integration tests focus on validating API behavior rather than implementation details.

The test suite verifies:

* Endpoint functionality
* Request validation behavior
* Response structures
* Database interactions
* Environment isolation

This approach helps ensure application behavior remains stable during future refactoring.
---
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
- Redis-based response caching
- Docker containerization
- Request tracing and structured logging

## 👤 Author
**Jeswanth Reddy B.**
Aspiring Full-Stack Developer
Focused on backend development, API design, and production-oriented Node.js applications.