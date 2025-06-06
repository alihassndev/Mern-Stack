import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  searchContacts,
  updateContact,
} from "../controller/contact.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(VerifyJWT, createContact);
router.route("/update").put(VerifyJWT, updateContact);
router.route("/delete/:id").delete(VerifyJWT, deleteContact);
router.route("/get-all-contacts").get(VerifyJWT, getAllContact);
router.route("/search").get(VerifyJWT, searchContacts);

export { router };
