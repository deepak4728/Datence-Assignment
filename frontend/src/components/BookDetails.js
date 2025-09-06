import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Chip, DialogActions, Button } from '@mui/material';

function BookDetails({ book, onClose }) {
  if (!book) return null;
  return (
    <Dialog open={!!book} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <img src={book.thumbnailUrl} alt={book.title} style={{ width: '120px', float: 'right', marginLeft: 16 }} />
        <Typography>Price: £{book.price}</Typography>
        <Typography>Stock: {book.stock}</Typography>
        <Typography>Rating: {book.rating}</Typography>
        <Typography>
          <a href={book.detailUrl} target="_blank" rel="noopener noreferrer">View on Books to Scrape</a>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookDetails;
