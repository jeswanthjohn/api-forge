// middleware/sanitize.js

/**
 * Recursively sanitize request payloads
 * Removes MongoDB operator injection attempts
 */

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};

  for (const key in obj) {
    // Block MongoDB operators and dot notation
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }

    sanitized[key] = sanitizeObject(obj[key]);
  }

  return sanitized;
};

const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

export default sanitizeRequest;