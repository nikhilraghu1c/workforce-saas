import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { validateUserFields } from "../../utils/validation.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    validateUserFields(req);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const { password: _, ...safeUser } = newUser.toObject();
    res
      .status(200)
      .json({ message: "User created successfully", user: safeUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "User creation failed" });
  }
};

export { registerUser };
