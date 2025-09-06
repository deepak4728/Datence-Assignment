import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip } from '@mui/material';

function BookCard({ book, onClick }) {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer', height: '100%' }}>
      <CardMedia
        component="img"
        height="180"
        image={book.thumbnailUrl}
        alt={book.title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{book.title}</Typography>
        <Typography color="text.secondary">£{book.price}</Typography>
        <Chip label={`Rating: ${book.rating}`} size="small" sx={{ mr: 1 }} />
        <Chip label={book.stock} size="small" color={/In stock/i.test(book.stock) ? 'success' : 'default'} />
      </CardContent>
    </Card>
  );
}

export default BookCard;
