import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRoutes from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true, // your frontend's origin
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,               // allow cookies/auth headers if needed
  })
);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);

// MongoDB connection
mongoose
  .connect("mongodb+srv://ghongadenisha_db_user:qAgzvAg44BG7W6ZH@cluster0.qsmpelq.mongodb.net/", {
    dbName: "MERN_E-Commerce",
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌:", err));

// Start server
const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
