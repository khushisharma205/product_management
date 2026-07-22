// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  FaUserPlus, FaSignInAlt, FaSignOutAlt,
  FaPlus, FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";

// Backend Base URL
const API_URL = import.meta.env.VITE_API_URL;

// Axios instance with interceptor for token
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  // ---------- AUTH STATE ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"

  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ---------- PRODUCT STATE ----------
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "General",
    inStock: true,
  });
  const [editingId, setEditingId] = useState(null);

  // ---------- TOKEN CHECK ON LOAD ----------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
      fetchProducts();
    }
  }, []);

  // ---------- AUTH HANDLERS ----------
  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
      const response = await axios.post(`${API_URL}${endpoint}`, authData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsLoggedIn(true);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setProducts([]);
  };

  // ---------- PRODUCT CRUD ----------
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        handleLogout();
      }
    }
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, price: Number(formData.price) };
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, dataToSend);
        alert("Product updated!");
      } else {
        await api.post("/products", dataToSend);
        alert("Product created!");
      }
      setFormData({ name: "", price: "", description: "", category: "General", inStock: true });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      alert("Deleted!");
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      inStock: product.inStock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- RENDER AUTH (if not logged in) ----------
  if (!isLoggedIn) {
    return (
      <div className="container auth-container">
        <div className="auth-card">
          <h1>{authMode === "login" ? <FaSignInAlt /> : <FaUserPlus />} {authMode === "login" ? "Login" : "Register"}</h1>
          <form onSubmit={handleAuthSubmit}>
            {authMode === "register" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={authData.name}
                onChange={handleAuthChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={authData.email}
              onChange={handleAuthChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={authData.password}
              onChange={handleAuthChange}
              required
              minLength="6"
            />
            {authMode === "register" && (
              <select name="role" value={authData.role} onChange={handleAuthChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            )}
            <button type="submit" className="btn-submit">
              {authMode === "login" ? <FaSignInAlt /> : <FaUserPlus />} {authMode === "login" ? "Login" : "Register"}
            </button>
          </form>
          <p>
            {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button className="link-btn" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? " Register" : " Login"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ---------- RENDER DASHBOARD (if logged in) ----------
  return (
    <div className="container">
      <div className="header">
        <h1><MdInventory /> Product Management</h1>
        <div className="user-info">
          <span>👋 Welcome, {user?.name} ({user?.role})</span>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Product Form */}
      <div className="form-card">
        <h2>{editingId ? <FaEdit /> : <FaPlus />} {editingId ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleProductChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleProductChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleProductChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-row checkbox-row">
            <label>
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleProductChange}
              />
              In Stock?
            </label>
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? <FaEdit /> : <FaPlus />} {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", price: "", description: "", category: "General", inStock: true });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Product Table */}
      <div className="table-container">
        <h2><MdInventory /> All Products ({products.length})</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td><strong>{p.name}</strong></td>
                    <td>₹{p.price}</td>
                    <td>{p.description}</td>
                    <td>{p.category}</td>
                    <td>{p.inStock ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(p)}><FaEdit /></button>
                      <button className="btn-delete" onClick={() => handleDelete(p._id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;