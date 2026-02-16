import Product from "../models/Product.js";

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

    // Price filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Category filtering
    if (category) {
      filter.category = category;
    }

    // Pagination
    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    // Safe sorting (whitelisted fields)
    let sortOption = { createdAt: -1 }; // default sort

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
      return res.status(400).json({
        message: "Name and price are required",
      });
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
      return res.status(404).json({ message: "Product not found" });
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
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
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
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
