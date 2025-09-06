require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const connectDB = require('./db');

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: String,
  rating: Number,
  detailUrl: String,
  thumbnailUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

const BASE_URL = 'https://books.toscrape.com/';

function getRating(text) {
  const ratings = {
    'One': 1,
    'Two': 2,
    'Three': 3,
    'Four': 4,
    'Five': 5,
  };
  return ratings[text] || 0;
}

async function scrapePage(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const books = [];
  $('.product_pod').each((_, el) => {
    const title = $(el).find('h3 a').attr('title');
    const price = parseFloat($(el).find('.price_color').text().replace('£', ''));
    const stock = $(el).find('.availability').text().trim();
    const rating = getRating($(el).find('.star-rating').attr('class').split(' ')[1]);
    const detailUrl = BASE_URL + $(el).find('h3 a').attr('href');
    const thumbnailUrl = BASE_URL + $(el).find('img').attr('src');
    books.push({ title, price, stock, rating, detailUrl, thumbnailUrl });
  });
  return { books, $ };
}

async function scrapeAllBooks() {
  await connectDB();
  let page = 1;
  let next = true;
  let url = BASE_URL + 'catalogue/page-1.html';
  let allBooks = [];
  while (next) {
    console.log(`Scraping page ${page}...`);
    const { books, $ } = await scrapePage(url);
    allBooks = allBooks.concat(books);
    const nextLink = $('.next a').attr('href');
    if (nextLink) {
      url = BASE_URL + 'catalogue/' + nextLink;
      page++;
    } else {
      next = false;
    }
  }
  await Book.deleteMany({});
  await Book.insertMany(allBooks);
  console.log(`Scraped and saved ${allBooks.length} books.`);
  mongoose.connection.close();
}

scrapeAllBooks().catch(console.error);
