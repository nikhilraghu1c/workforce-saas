import express from "express";
import { registerAdmin } from "../controllers/auth/register-admin.controller.js";

const authRouter = express.Router();

authRouter.post("/register-admin", registerAdmin);

export default authRouter;