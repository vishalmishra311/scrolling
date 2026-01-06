const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes=require("./routes/products")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/products",productRoutes)
// 👇 Serve uploaded images
app.use("/uploads", express.static("uploads"));

// 🔹 MongoDB connection (LOCAL)
mongoose
  .connect("mongodb://127.0.0.1:27017/itemDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));


// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
