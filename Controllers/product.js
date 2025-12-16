// Controllers/product.js
import { Products } from "../Models/Product.js";

// 🟢 Add Product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imageSrc } = req.body;

  try {
    const product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imageSrc,
    });

    res.json({
      message: "✅ Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// 🟣 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.json({ message: "All products", success: true, products });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// 🟡 Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product) {
      return res.json({ message: "❌ Invalid product ID", success: false });
    }
    res.json({ message: "Specific product", success: true, product });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// 🔵 Update Product By ID
export const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.json({ message: "❌ Invalid product ID", success: false });
    }
    res.json({ message: "✅ Product updated successfully", success: true, product });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// 🔴 Delete Product By ID
export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.json({ message: "❌ Invalid product ID", success: false });
    }

    res.json({ message: "🗑️ Product deleted successfully", success: true, product });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

