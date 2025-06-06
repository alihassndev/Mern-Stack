import { Contact } from "../model/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { contactSchema } from "../validations/contactValidation.js";

const createContact = asyncHandler(async (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  console.log(value);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  console.log(value);

  const contact = await Contact.create({ ...value, user: req.user._id });

  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Something went wrong" });
  }

  return res
    .status(201)
    .json({ success: true, message: "Contact created successfully" });
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  // If none of the fields are provided
  if (!name && !email && !phone) {
    return res.status(400).json({
      success: false,
      message: "At least one field (name, email, phone) must be provided",
    });
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Invalid contact request ...",
    });
  }

  const updatedFields = {};

  if (name !== undefined && name !== "") updatedFields.name = name;
  if (email !== undefined && email !== "") updatedFields.email = email;
  if (phone !== undefined && phone !== "") updatedFields.phone = phone;

  const updatedContact = await Contact.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    contact: updatedContact,
  });
});

const getAllContact = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  const contacts = await Contact.find({ user: user._id });

  if (!contacts || contacts.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No contacts found ..." });
  }

  return res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    return res
      .status(404)
      .json({ success: false, message: "Contact not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Contact deleted successfully ..." });
});

const searchContact = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required" });
  }

  const contacts = await Contact.find({
    name: { $regex: name, $options: "i" },
  }).populate("user");

  return res.status(200).json({
    success: true,
    contacts,
  });
});

export {
  createContact,
  updateContact,
  deleteContact,
  getAllContact,
  searchContact,
};
