import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookGrid from './components/BookGrid';
import Filters from './components/Filters';
import BookDetails from './components/BookDetails';
import { Container, Typography, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({ search: '', rating: '', inStock: '', minPrice: '', maxPrice: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { ...filters, page };
        const res = await axios.get('/api/books', { params });
        setBooks(res.data.books);
        setTotalPages(res.data.pages);
      } catch (err) {
        setError('Failed to fetch books');
      }
      setLoading(false);
    };
    fetchBooks();
  }, [filters, page]);

  const handleScrape = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!scrapeUrl) {
      setError('Please enter a URL');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/refresh', { url: scrapeUrl });
      setSuccess('Scraping started! Refresh the book list after a while.');
      setScrapeUrl('');
    } catch (err) {
      setError('Failed to start scraping');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">Book Explorer</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <form onSubmit={handleScrape} style={{ width: '100%', maxWidth: 500, display: 'flex', gap: 8 }}>
          <TextField
            label="Book Site URL"
            variant="outlined"
            fullWidth
            value={scrapeUrl}
            onChange={e => setScrapeUrl(e.target.value)}
            placeholder="https://books.toscrape.com/"
          />
          <Button type="submit" variant="contained" color="secondary">Scrape & Save</Button>
        </form>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Box>
      <Filters filters={filters} setFilters={setFilters} setPage={setPage} />
      <BookGrid books={books} setSelectedBook={setSelectedBook} page={page} setPage={setPage} totalPages={totalPages} />
      <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
    </Container>
  );
}

export default App;
