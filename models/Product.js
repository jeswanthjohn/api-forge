import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters long"],
      maxlength: [50, "Category cannot exceed 50 characters"],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound index for common query pattern:
// Filtering by category + sorting by price
productSchema.index({ category: 1, price: -1 });

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("Product", productSchema);
