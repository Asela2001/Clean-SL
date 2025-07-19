import Auth from "../Models/Auth.js";
import bcrypt from "bcryptjs"; // Keep for password hashing

export const registerUser = async (req, res) => {
  try {
    const requiredFields = ["firstname", "lastname", "email", "password"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    const { firstname, lastname, email, password } = req.body;

    // Check if user exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    // Hash password (still important for security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Return user data without password
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await Auth.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Return user data without password
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "Failed to log in",
    });
  }
};
