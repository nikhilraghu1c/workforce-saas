import { environment } from "../config/environment.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const { ACCESS_TKN_SECRET } = environment;

const userAuth = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: Please Login" });
    }
    const decodedObj = jwt.verify(accessToken, ACCESS_TKN_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Authentication failed" });
  }
};

export { userAuth };