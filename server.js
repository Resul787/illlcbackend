// backend/server.js
import dotenv from "dotenv";
dotenv.config(); // .env faylını yükləyir

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routeləri import et
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import messageRoutes from "./routes/messages.js"; // ✅ Mesaj routeləri

const app = express();

// ✅ Bədən limiti artırıldı (JSON və Base64 şəkillər üçün)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ CORS aktiv edildi (frontend React serverinə icazə)
app.use(cors());

// ✅ Routelər
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes); // ✅ Mesaj routeləri əlavə edildi

// ✅ MongoDB bağlantısı
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI .env faylında tapılmadı!");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Mongo Error:", err));

// ✅ Error handling middleware (isteğe bağlı, problem olduqda frontend-ə xəbər verəcək)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Serverdə xəta baş verdi" });
});
