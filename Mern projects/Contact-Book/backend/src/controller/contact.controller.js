import { Contact } from "../model/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { contactSchema } from "../validations/contactValidation.js";

const createContact = asyncHandler(async (req, res) => {
  const { error, value } = contactSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  console.log(value);

  const contact = await Contact.create(value);

  if (!contact) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }

  return res
    .status(201)
    .json({ success: true, message: "Contact created successfully" });
});

export { createContact };
