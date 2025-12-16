import express from "express";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../Controllers/cart.js";

import { Authenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/add", Authenticated, addToCart);
router.post("/decrease", Authenticated, decreaseQty);
router.post("/remove", Authenticated, removeFromCart);

export default router;
