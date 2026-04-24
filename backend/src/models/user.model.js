import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { environment } from "../config/environment.js";

const { ACCESS_TKN_SECRET, ACCESS_TKN_EXPIRE } = environment;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, role: user.role },
    ACCESS_TKN_SECRET,
    { expiresIn: ACCESS_TKN_EXPIRE }
  );
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  return await bcrypt.compare(passwordInputByUser, user.password);
};

export default mongoose.model("User", userSchema);
