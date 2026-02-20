# API Forge – Products REST API 🚀

A production-ready **REST API** built with **Node.js, Express, MongoDB, and Mongoose** that provides full CRUD (Create, Read, Update, Delete) operations for managing products.

This project is designed as a **backend portfolio service** to demonstrate real-world API design, database persistence, environment-based configuration, and cloud deployment.

---

## 🌐 Live Deployment

**Base URL**  
[https://rest-api-jeswanth.onrender.com](https://rest-api-jeswanth.onrender.com)

> Deployed on **Render** with a live **MongoDB Atlas** database.  
> Data persists across redeployments.

---

## ✨ Key Features

- 📦 Product management via RESTful APIs
- 🗄 Persistent storage using MongoDB Atlas
- 🔁 Full CRUD operations (POST, GET, PUT, DELETE)
- ⚙️ Environment-based configuration with dotenv
- 🚀 Cloud deployment on Render
- 🧪 Tested end-to-end using Postman
- 🧼 Production-safe logging (debug logs removed after verification)

---

## 🧠 API Design Overview

The API follows standard REST conventions:

- **POST** → create a new product
- **GET** → retrieve products
- **PUT** → update an existing product by ID
- **DELETE** → remove a product by ID

Each product is stored as a MongoDB document and assigned a unique `_id`, which is used for update and delete operations.

---

## 🧰 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- dotenv

### Deployment

- Platform: Render
- Service Type: Web Service
- Runtime: Node.js

---

## 📦 API Endpoints

### Get all products

```http
GET /api/products

** Response **

```
[
  {
    "_id": "6963d8dc3d943529c1ce5dde",
    "name": "Pixel 8",
    "price": 69999,
    "category": "electronics",
    "createdAt": "2026-01-11T17:07:40.009Z",
    "updatedAt": "2026-01-11T17:07:40.009Z"
  }
]
```
Create a new product
```
POST /api/products
```
Create a new product
```
POST /api/products
```
Response


```json
{
  "_id": "6963d8dc3d943529c1ce5dde",
  "name": "Pixel 8",
  "price": 69999,
  "category": "electronics",
  "createdAt": "2026-01-11T17:07:40.009Z",
  "updatedAt": "2026-01-11T17:07:40.009Z"
}
```
Get a single product
```
GET /api/products/:id
```
Update a product
```
PUT /api/products/:id
```
Request Body
```
json
{
  "price": 64999
}
```

Delete a product
```
DELETE /api/products/:id
```
## ⚙️ Environment Configuration
Create a .env file in the project root (not committed):

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```
## 🧪 Testing
- All endpoints were tested using Postman
- POST and GET operations were verified with real persisted data
- MongoDB persistence confirmed across Render redeployments

## 📌 Notes
- Temporary sanity-check logs were used during development and removed after verification
- Only startup and connection logs are retained
- This project focuses on backend correctness and reliability

## 🔮 Planned Enhancements
- Input validation and schema constraints
- Centralized error handling
- Pagination and filtering
- Authentication and authorization (JWT)

## 👤 Author
**Jeswanth Reddy B.** 
Aspiring Full-Stack Developer
Focused on building reliable, production-grade backend systems