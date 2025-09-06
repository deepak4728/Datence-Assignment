import React from 'react';
import { Grid, Pagination } from '@mui/material';
import BookCard from './BookCard';

function BookGrid({ books, setSelectedBook, page, setPage, totalPages }) {
  return (
    <>
      <Grid container spacing={2}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <BookCard book={book} onClick={() => setSelectedBook(book)} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
}

export default BookGrid;
