import express from "express";
import { getAllProducts, createProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);        // GET /api/products
router.post("/", createProduct);        // POST /api/products
router.delete("/:id", deleteProduct);   // DELETE /api/products/:id

export default router;
