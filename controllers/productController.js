import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

// GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      minPrice,
      maxPrice,
      category,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (category) {
      filter.category = category;
    }

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    let sortOption = { createdAt: -1 };

    if (sort) {
      const allowedSortFields = ["price", "-price", "createdAt", "-createdAt"];
      if (allowedSortFields.includes(sort)) {
        sortOption = sort;
      }
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price == null) {
      return next(new AppError("Name and price are required", 400));
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price == null) {
      return next(new AppError("Name and price are required", 400));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
