import mongoose from "mongoose";
import Business from "./business.model.js";
import User from "../users/user.model.js";
import {
  RequestValidationError,
  validateBusinessRegistration,
} from "./business.validation.js";

const registerBusiness = async (req, res) => {
  try {
    const { businessName, businessType, ownerName, email, password } =
      validateBusinessRegistration(req.body);

    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Start session for transaction
    const session = await mongoose.startSession();
    let newBusiness;
    let newUser;

    try {
      await session.withTransaction(async () => {
        // Pre-generating this ID resolves the Business <-> User reference cycle
        // while retaining required fields on both schemas.
        const businessId = new mongoose.Types.ObjectId();

        newUser = new User({
          name: ownerName,
          email,
          password,
          role: "OWNER",
          businessId,
        });

        newBusiness = new Business({
          _id: businessId,
          name: businessName,
          type: businessType,
          ownerId: newUser._id,
        });

        await newUser.save({ session });
        await newBusiness.save({ session });
      });
    } finally {
      await session.endSession();
    }

    return res.status(201).json({
      message: "Business and owner registered successfully",
      business: newBusiness,
      owner: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      const [validationError] = Object.values(error.errors);
      return res.status(400).json({ message: validationError.message });
    }

    console.error("Business registration failed:", error);
    return res.status(500).json({
      message: "Failed to register business",
    });
  }
};

export { registerBusiness };
