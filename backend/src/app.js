import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { userAuth } from "./middlewares/auth.middleware.js";
import { authorize } from "./middlewares/authorize.middleware.js";

// Initialize Express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", authRouter);
app.use("/api/user/", userAuth, authorize("ADMIN"), userRouter);

export default app;
