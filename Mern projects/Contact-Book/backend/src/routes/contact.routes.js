import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  searchContact,
  updateContact,
} from "../controller/contact.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createContact);
router.route("/update/:id").put(verifyJWT, updateContact);
router.route("/delete/:id").delete(verifyJWT, deleteContact);
router.route("/").get(verifyJWT, getAllContact);
router.route("/search").get(verifyJWT, searchContact);

export { router };
