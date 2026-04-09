const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email, password required" });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (password.length < 6) return res.status(400).json({ error: "Password must be >= 6 chars" });

  const hash = await bcrypt.hash(password, 10);
  try {
    db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hash);
    res.json({ success: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email & password required" });

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, "secretkey", { expiresIn: "1h" });
  res.json({ token, user: { name: user.name, role: user.role } });
});

module.exports = router;