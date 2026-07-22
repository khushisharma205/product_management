// middleware/auth.js
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // 1. Check karo ki Authorization header mein token hai ya nahi
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // "Bearer xyz" se "xyz" nikalo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id: '...', email: '...', role: '...' }
      next(); // Next middleware/route par bhejo
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = { protect };