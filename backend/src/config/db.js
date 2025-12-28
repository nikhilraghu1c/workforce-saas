import mongoose from "mongoose";
import { environment } from "./environment.js";

const connectDB = async () => {
  try {
    await mongoose.connect(environment.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // process exit used to terminate the application in case of a connection failure
    process.exit(1);
  }
};

export default connectDB;
