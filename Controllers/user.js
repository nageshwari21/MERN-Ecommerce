import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already registered ❌", success: false });
    }

    const hashPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPass,
    });

    res.json({
      message: "User registered successfully ✅",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ message: "User not found ❌", success: false });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ message: "Invalid credentials ❌", success: false });

    // Token creation
    const token = jwt.sign(
      { id: user._id },
      "!@#$%^&*()", // secret key (use env variable in production)
      { expiresIn: "365d" }
    );

    res.json({
      message: `Welcome ${user.name} ✅`,
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// ✅ ALL USERS
export const user = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ✅ PROFILE (Protected)
export const profile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
