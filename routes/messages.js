// backend/routes/messages.js
import express from "express";
import {
  getAllMessages,
  createMessage,
  deleteAllMessages,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getAllMessages);           // Bütün mesajları gətir
router.post("/", createMessage);           // Yeni mesaj əlavə et
router.delete("/", deleteAllMessages);    // Bütün mesajları sil
router.delete("/:id", deleteMessage);     // Tək mesajı sil

export default router;
