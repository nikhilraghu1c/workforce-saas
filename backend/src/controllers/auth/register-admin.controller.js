import bcrypt from "bcrypt";
import Organization from "../../models/organization.model.js";
import User from "../../models/user.model.js";

const registerAdmin = async (req, res) => {
  try {
    console.log("Register Admin Request Body:", req.body);
    let { name, email, password, orgName } = req.body;
    const hashedPassword  = await bcrypt.hash(password, 10);

    const organization = await Organization.create({ name: orgName });

    // or we can use organization.save() if we create an instance using new Organization()
    // example : // const organization = new Organization({ name: orgName });
    // await organization.save();
    // same for User model below

    const adminUser = {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      organizationId: organization._id,
    };
    const savedUser = await User.create(adminUser);
    res.status(200).json({ message: "Admin registered successfully", data: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Failed to register admin" });
  }
};

export { registerAdmin };
