import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  qty: { type: Number, default: 1 },
  imageSrc: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ named export (as you wanted)
export const Products = mongoose.model("Products", productSchema);
