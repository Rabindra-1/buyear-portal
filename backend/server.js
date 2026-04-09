const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const favRoutes = require("./routes/favourites");

const app = express();

// Configure CORS to allow your Vercel frontend
app.use(cors({
  origin: "https://buyear-portal.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

// Health check route for Render
app.get("/", (req, res) => {
  res.send("Buyear Portal Backend is Running...");
});

// Routes
app.use("/auth", authRoutes);
app.use("/favourites", favRoutes);

// Use process.env.PORT for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});