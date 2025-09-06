const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, index: true },
  price: Number,
  stock: String,
  rating: Number,
  detailUrl: String,
  thumbnailUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
