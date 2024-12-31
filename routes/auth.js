const express = require("express");
const router = express.Router();

const User = require("../db/users");
const { registerUser, loginUser } = require("../handelers/auth-handeler");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide name, email, and password." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    await registerUser({ name, email, password });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password." });
    }

    const result = await loginUser({ email, password });

    if (result) {
      return res
        .status(200)
        .json({ message: "Login successful.", data: result });
    } else {
      return res
        .status(400)
        .json({ error: "Please check your Email or Password again." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
