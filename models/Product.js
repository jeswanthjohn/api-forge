import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      index: true, // Improves search performance by name
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true, // Optimizes filtering & sorting by price
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true, // Optimizes filtering by category
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

/**
 * Compound index for common query pattern:
 * Filtering by category and sorting by price
 * Example: /api/products?category=Electronics&sort=-price
 */
productSchema.index({ category: 1, price: -1 });

export default mongoose.model("Product", productSchema);
