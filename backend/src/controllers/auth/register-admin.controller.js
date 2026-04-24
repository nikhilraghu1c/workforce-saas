import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../models/user.model.js";
import { validateAdminFields } from "../../utils/validation.js";

const registerAdmin = async (req, res) => {
  // Start session for transaction
  const session = await mongoose.startSession();

  try {
    // Extract and validate request body
    const { name, email, password } = req.body;

    if (!validateAdminFields(req.body)) {
      return res
        .status(400)
        .json({ message: "Invalid fields in request body" });
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
    // or we can use organization.save() if we create an instance using new Organization()
    // example : // const organization = new Organization({ name: orgName }); await organization.save();
    // same for User model below
    // const organization = await Organization.create([{ name: orgName }], {
    //   session,
    // });

    // Create Admin User
    const adminUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
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
