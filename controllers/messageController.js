// backend/controllers/messageController.js
import Message from "../models/Message.js";

// Bütün mesajları gətir
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Yeni mesaj əlavə et
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Bütün sahələr doldurulmalıdır!" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bütün mesajları sil
export const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: "Bütün mesajlar silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tək mesaj sil
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Mesaj silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
