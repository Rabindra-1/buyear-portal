const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Get user's favourites
router.get("/", auth, (req, res) => {
  const favs = db.prepare("SELECT property_id FROM favourites WHERE user_id = ?").all(req.user.id);
  res.json(favs);
});

// Add favourite
router.post("/", auth, (req, res) => {
  const { property_id } = req.body || {};
  if (!property_id) return res.status(400).json({ error: "Property ID required" });

  const exists = db.prepare("SELECT * FROM favourites WHERE user_id = ? AND property_id = ?").get(req.user.id, property_id);
  if (exists) return res.status(400).json({ error: "Already in favourites" });

  db.prepare("INSERT INTO favourites (user_id, property_id) VALUES (?, ?)").run(req.user.id, property_id);
  res.json({ success: "Added to favourites" });
});

// Remove favourite
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  db.prepare("DELETE FROM favourites WHERE user_id = ? AND property_id = ?").run(req.user.id, id);
  res.json({ success: "Removed from favourites" });
});

module.exports = router;