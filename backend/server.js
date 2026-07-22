// server.js (Complete Backend with JWT Authentication - NO FRONTEND CODE)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Token generate karne ke liye
const connectDB = require("./config/db");
const User = require("./models/User"); // 🔥 Naya User Model
const Product = require("./models/Product");
const { protect } = require("./middleware/Auth"); // 🔥 Auth Middleware

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// =============================================
// 1. TEST ROUTE (Public - Bina token ke chalega)
// =============================================
app.get("/", (req, res) => {
  res.send("Server is running with JWT Authentication!");
});

// =============================================
// 2. AUTH ROUTES (Public - Bina token ke Register/Login)
// =============================================

// 📌 REGISTER - POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password, role });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 din tak valid
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 📌 LOGIN - POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. User ko email se dhoondo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 2. Password match karo
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 3. JWT Token generate karo
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================
// 3. PRODUCT CRUD ROUTES (PROTECTED - Token mandatory hai)
// 🔥 Har route mein "protect" middleware laga diya gaya hai
// =============================================

// 📌 CREATE - POST /api/products
app.post("/api/products", protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 📌 READ ALL - GET /api/products
app.get("/api/products", protect, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📌 READ ONE - GET /api/products/:id
app.get("/api/products/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📌 UPDATE - PUT /api/products/:id
app.put("/api/products/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📌 DELETE - DELETE /api/products/:id
app.delete("/api/products/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================
// 4. SERVER START
// =============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});