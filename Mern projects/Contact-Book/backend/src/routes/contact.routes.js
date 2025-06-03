import { Router } from "express";
import { createContact } from "../controller/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);

export { router };
