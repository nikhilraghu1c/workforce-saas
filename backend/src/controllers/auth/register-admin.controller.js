import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Organization from "../../models/organization.model.js";
import User from "../../models/user.model.js";
import { validateAdminFields } from "../../utils/validation.js";

const registerAdmin = async (req, res) => {
  // Start session for transaction
  const session = await mongoose.startSession();

  try {
    // Extract and validate request body
    const { name, email, password, orgName } = req.body;

    if (!validateAdminFields(req.body)) {
      return res
        .status(400)
        .json({ message: "Invalid fields in request body" });
    }

    // Check if organization or user already exists
    const existingOrg = await Organization.findOne({ name: orgName });

    if (existingOrg) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // start transaction
    session.startTransaction();

    // Hash password and create organization and admin user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Organization
    const organization = await Organization.create([{ name: orgName }], {
      session,
    });

    // Create Admin User
    const adminUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
          organizationId: organization[0]._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Respond with success
    return res.status(201).json({
      message: "Admin registered successfully",
      data: adminUser[0],
    });
  } catch (error) {
    // Handle errors and rollback transaction
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      message: "Failed to register admin",
      error: error.message,
    });
  }
};

export { registerAdmin };
