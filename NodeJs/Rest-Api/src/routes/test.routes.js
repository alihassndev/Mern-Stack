import { Router } from "express";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
} from "../controller/test.controller.js";

const router = Router();

router.route("/").get(getAllData);
router.route("/").post(createData);
router.route("/update/:id").patch(updateData);
router.route("/update/:id").delete(deleteData);

export { router };
