import React from 'react';
import { Grid, Pagination, Typography } from '@mui/material';
import BookCard from './BookCard';

function BookGrid({ books, setSelectedBook, page, setPage, totalPages }) {
  return (
    <>
      {books.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4, mb: 4 }} color="text.secondary">
          No books found. Try changing your filters or search.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {books.map(book => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <BookCard book={book} onClick={() => setSelectedBook(book)} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
}

export default BookGrid;
