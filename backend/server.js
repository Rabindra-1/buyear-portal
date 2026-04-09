const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const favRoutes = require("./routes/favourites");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/favourites", favRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));