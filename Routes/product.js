// Routes/product.js
import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById, // ✅ added
} from "../Controllers/product.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById); // ✅ added

export default router;
