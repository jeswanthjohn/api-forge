import Joi from "joi";

/**
 * Product validation schema
 * Ensures clean and predictable API input
 */
const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least 2 characters long",
      "string.max": "Product name cannot exceed 100 characters",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
    }),

  category: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Category is required",
    }),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("")
    .optional(),
});

/**
 * Middleware to validate product creation
 */
export const validateCreateProduct = (req, res, next) => {
  const { error, value } = productSchema.validate(req.body, {
    abortEarly: false, // return all errors
    stripUnknown: true, // remove unknown fields
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  req.body = value;
  next();
};

/**
 * Middleware to validate product update
 * Allows partial updates
 */
export const validateUpdateProduct = (req, res, next) => {
  const updateSchema = productSchema.fork(
    ["name", "price", "category"],
    (field) => field.optional()
  );

  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  req.body = value;
  next();
};
