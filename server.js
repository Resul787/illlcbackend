import dotenv from "dotenv";
dotenv.config(); // .env faylını yükləyir

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routeləri import et
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import messageRoutes from "./routes/messages.js";

const app = express();

// ✅ Bədən limiti artırıldı (JSON və Base64 şəkillər üçün)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ❌ KÖHNƏ: app.use(cors());
// ✅ YENİ: CORS-u yalnız sizin domeniniz və Render.com mühiti üçün dəqiq tənzimləyirik!
const allowedOrigins = [
    'https://ilholding.az',
    'https://www.ilholding.az',
    // Bu, həm də Render.com-un öz domenindən gələn sorğulara icazə verir
    'https://illlcbackend.onrender.com' 
];

app.use(cors({
    origin: (origin, callback) => {
        // Brauzer sorğusu yoxdursa (məsələn, server-dən serverə), icazə ver
        if (!origin) return callback(null, true); 
        
        // Domen siyahıda varsa və ya lokaldirsə, icazə ver
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Başqa domenlərə icazə vermə
            callback(new Error('CORS: Not allowed by domain policy'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Cookies və Authorization header-ləri keçirməyə icazə
}));

// ✅ Routelər
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);

// ✅ MongoDB bağlantısı üçün MONGO_URI dəyişəni Render.com Environment Variables-da olmalıdır
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI .env-də və ya mühit dəyişənlərində tapılmadı!");
  process.exit(1);
}

// ✅ Render.com mühitində dinamik port istifadə olunur (PORT mühit dəyişəni ilə)
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => console.log(`🚀 Server running successfully on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo Error:", err));

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Serverdə xəta baş verdi" });
});
