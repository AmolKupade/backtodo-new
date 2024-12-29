// const express = require("express");

// const router = express.Router();

// const User = require("../db/users");
// const { registerUser, loginUser } = require("../handelers/auth-handler");

// router.post("/register", async (req, res) => {
//   let model = req.body;

//   if (model.name && model.email && model.password) {
//     await registerUser(model);

//     res.send({
//       message: "User Registered Successfully",
//     });
//   } else {
//     res.status(400).json({
//       error: "Please provide name, email, password",
//     });
//   }
// });

// router.post("/login", async (req, res) => {
//   let model = req.body;

//   if (model.email && model.password) {
//   let result = await loginUser(model);

//   if (result) {
//     res.send(result)
//   } else {
//     res.status(400).json({
//         error: "email or password is incorrect",
//       });
//   }

//     res.send({
//       message: "User Login Successfully",
//     });
//   } else {
//     res.status(400).json({
//       error: "Please provide email, password",
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();

const User = require("../db/users"); // Assuming you have a User model from mongoose
const { registerUser, loginUser } = require("../handelers/auth-handeler");

// Register User Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide name, email, and password." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Call the handler to register the user
    await registerUser({ name, email, password });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Login User Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password." });
    }

    // Authenticate the user
    const result = await loginUser({ email, password });

    if (result) {
      return res.status(200).json({ message: "Login successful.", data: result });
    } else {
      return res.status(400).json({ error: "Please check your Email or Password again." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;

