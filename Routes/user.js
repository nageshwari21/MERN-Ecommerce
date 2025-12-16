import express from "express";
import { register, login, user, profile } from "../Controllers/user.js";
import { Authenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", user);

// ✅ Protected route
router.get("/profile", Authenticated, profile);

export default router;
