const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("User logged out successfully");
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Logout failed" });
  }
}

export { logout };