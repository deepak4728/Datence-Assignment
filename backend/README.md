# Book Explorer Backend

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI and desired PORT.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the backend server.

## Endpoints
- `GET /api/books`: Paginated, filter by rating, price, stock, search by title.
- `GET /api/books/:id`: Book details.
- `POST /api/refresh`: Trigger scraper (bonus).
