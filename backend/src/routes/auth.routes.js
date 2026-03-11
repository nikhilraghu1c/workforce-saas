import express from "express";
import { registerAdmin } from "../controllers/auth/register-admin.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";

const authRouter = express.Router();

authRouter.post("/register-admin", registerAdmin);
authRouter.post("/login", login);
authRouter.post("/logout", logout);


export default authRouter;