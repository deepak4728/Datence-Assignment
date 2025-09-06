import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookGrid from './components/BookGrid';
import Filters from './components/Filters';
import BookDetails from './components/BookDetails';
import { Container, Typography } from '@mui/material';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({ search: '', rating: '', inStock: '', minPrice: '', maxPrice: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const params = { ...filters, page };
      const res = await axios.get('/api/books', { params });
      setBooks(res.data.books);
      setTotalPages(res.data.pages);
    };
    fetchBooks();
  }, [filters, page]);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Book Explorer</Typography>
      <Filters filters={filters} setFilters={setFilters} setPage={setPage} />
      <BookGrid books={books} setSelectedBook={setSelectedBook} page={page} setPage={setPage} totalPages={totalPages} />
      <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
    </Container>
  );
}

export default App;
