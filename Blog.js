const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String, date: { type: Date, default: Date.now } }],
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);  // Use module.exports instead of export default
