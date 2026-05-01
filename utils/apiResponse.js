
export const successResponse = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};