import Router from "express";
import { register } from "../controller/auth.controller.js";

const router = Router();

router.route("/login").get(register);

export default router;
