import mongoose from "mongoose";

export const BUSINESS_TYPES = ["SALON", "CLINIC"];

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [5, "Business name must be at least 5 characters long"],
      maxlength: [100, "Business name cannot exceed 100 characters"],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: BUSINESS_TYPES,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Business", businessSchema);
