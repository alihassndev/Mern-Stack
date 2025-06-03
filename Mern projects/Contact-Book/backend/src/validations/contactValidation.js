import Joi from "joi";

const contactSchema = Joi.object({
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
    "string.base": "User ID must be a string",
  }),
  name: Joi.string().min(2).max(60).required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
    "string.min": "Name must be atleast 2 characters",
    "string.max": "Name must be atmost 60 characters",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "any.required": "Phone is required",
      "string.pattern.base": "Phone number must be 11 to 15 digits",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
});

export { contactSchema };
