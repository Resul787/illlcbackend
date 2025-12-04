import Product from "../models/Product.js";

// 🔹 Bütün məhsulları gətir
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Yeni məhsul əlavə et (şəkillə birlikdə)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !category) {
      return res
        .status(400)
        .json({ message: "Məhsulun adı və kateqoriyası vacibdir." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image, // base64 string kimi saxlanır
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Məhsul əlavə olunmadı:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Məhsulu sil
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Məhsul tapılmadı." });
    res.json({ message: "🗑️ Məhsul silindi!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
