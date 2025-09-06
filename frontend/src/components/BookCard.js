import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function BookCard({ book, onClick }) {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer', height: '100%', boxShadow: 4, transition: '0.2s', '&:hover': { boxShadow: 8 } }}>
      <CardMedia
        component="img"
        height="180"
        image={book.thumbnailUrl}
        alt={book.title}
        sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
      />
      <CardContent>
        <Typography variant="h6" noWrap color="primary" sx={{ fontWeight: 600 }}>{book.title}</Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>£{book.price}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip icon={<StarIcon sx={{ color: '#FFD700' }} />} label={book.rating} size="small" sx={{ bgcolor: '#fffbe6', fontWeight: 500 }} />
          {(/In stock/i.test(book.stock)) ? (
            <Chip icon={<CheckCircleIcon color="success" />} label="In Stock" size="small" color="success" />
          ) : (
            <Chip icon={<CancelIcon color="error" />} label="Out of Stock" size="small" color="error" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookCard;
