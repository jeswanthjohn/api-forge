import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middleware/validateProduct.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", validateCreateProduct, createProduct);

router.get("/:id", getProductById);

router.put("/:id", validateUpdateProduct, updateProduct);

router.delete("/:id", deleteProduct);

export default router;
