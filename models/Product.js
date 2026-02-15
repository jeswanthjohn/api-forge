import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
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
      minlength: [2, "Category must be at least 2 characters long"],
      maxlength: [50, "Category cannot exceed 50 characters"],
      index: true, // Optimizes filtering by category
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    versionKey: false, // Removes __v field (cleaner API responses)
  }
);

/**
 * Compound index for common query pattern:
 * Filtering by category and sorting by price
 * Example:
 * /api/products?category=Electronics&sort=-price
 */
productSchema.index({ category: 1, price: -1 });

/**
 * Optional: Transform output before sending JSON response
 * Removes internal MongoDB fields if needed.
 */
productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("Product", productSchema);
