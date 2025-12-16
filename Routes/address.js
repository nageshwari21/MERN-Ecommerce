import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js"; // ✅ Added getAddress
import { Authenticated } from "../Middleware/Auth.js";

const router = express.Router();

// ✅ Routes
router.post("/add", Authenticated, addAddress);
router.get("/get", Authenticated, getAddress);

export default router;
