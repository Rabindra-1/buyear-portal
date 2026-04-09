const Database = require("better-sqlite3");
const db = new Database("buyer-portal.db");

// Users table
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'buyer'
)`).run();

// Favourites table
db.prepare(`CREATE TABLE IF NOT EXISTS favourites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  property_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`).run();

module.exports = db;