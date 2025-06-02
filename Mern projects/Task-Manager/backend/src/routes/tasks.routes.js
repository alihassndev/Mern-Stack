import { Router } from "express";
import { createTask } from "../controller/tasks.controller.js";

const router = Router();

router.route("/create").post(createTask);

export { router };
