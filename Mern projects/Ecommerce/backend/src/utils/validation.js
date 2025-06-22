// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (minimum 6 characters)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Phone number validation (basic)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

// Price validation (positive number)
export const isValidPrice = (price) => {
  return price && !isNaN(price) && parseFloat(price) > 0;
};

// Quantity validation (positive integer)
export const isValidQuantity = (quantity) => {
  return quantity && !isNaN(quantity) && parseInt(quantity) > 0;
};

// ObjectId validation
export const isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

// Required field validation
export const isRequired = (value) => {
  return value !== undefined && value !== null && value !== "";
};

// String length validation
export const isValidLength = (str, min, max) => {
  if (!str) return false;
  const length = str.trim().length;
  return length >= min && length <= max;
};

// Rating validation (1-5)
export const isValidRating = (rating) => {
  return rating && !isNaN(rating) && rating >= 1 && rating <= 5;
};

// Payment method validation
export const isValidPaymentMethod = (method) => {
  return ["stripe", "cod"].includes(method);
};

// Order status validation
export const isValidOrderStatus = (status) => {
  return [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ].includes(status);
};

// User role validation
export const isValidUserRole = (role) => {
  return ["user", "admin"].includes(role);
};
