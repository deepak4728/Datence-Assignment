const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, rating, minPrice, maxPrice, inStock, search } = req.query;
    const query = {};
    if (rating) query.rating = Number(rating);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (inStock === 'true') query.stock = /In stock/i;
    if (inStock === 'false') query.stock = { $not: /In stock/i };
    if (search) query.title = { $regex: search, $options: 'i' };
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Book.countDocuments(query);
    res.json({ books, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
