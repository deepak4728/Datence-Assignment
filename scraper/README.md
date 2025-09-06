# Book Explorer Scraper

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI.
2. Run `npm install` to install dependencies.
3. Run `npm start` to scrape books and store them in the database.

## Output
- Book data will be stored in the `books` collection in MongoDB.

## Dependencies
- axios
- cheerio
- mongoose
- dotenv
