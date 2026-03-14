import { validateLoginData } from "../../utils/validation.js";
import User from "../../models/user.model.js";
import { environment } from "../../config/environment.js";

const { ACCESS_TKN_EXPIRE, NODE_ENV } = environment;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    validateLoginData(req);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 2 * ACCESS_TKN_EXPIRE),
        httpOnly: false,
        sameSite: "Strict",
        secure: NODE_ENV === "production",
      });
      res.send({
        message: "Login successful",
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Login failed" });
  }
};

export { login };
