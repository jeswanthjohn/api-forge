import { errorResponse } from "../utils/apiResponse.js";

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  // Handle duplicate key errors
  if (err.code === 11000) {
    return errorResponse(
      res,
      409,
      "Duplicate resource already exists"
    );
  }

  // Operational errors
  if (err.isOperational) {
    return errorResponse(res, err.statusCode, err.message);
  }

  console.error("ERROR 💥", err);

  return errorResponse(res, 500, "Something went wrong!");
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default errorHandler;