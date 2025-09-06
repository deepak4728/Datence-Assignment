import React from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

function Filters({ filters, setFilters, setPage }) {
  const handleChange = e => {
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
    setPage(1);
  };
  const handleReset = () => {
    setFilters({ search: '', rating: '', inStock: '', minPrice: '', maxPrice: '' });
    setPage(1);
  };
  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField label="Search Title" name="search" value={filters.search} onChange={handleChange} />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Rating</InputLabel>
        <Select name="rating" value={filters.rating} label="Rating" onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          {[1,2,3,4,5].map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Stock</InputLabel>
        <Select name="inStock" value={filters.inStock} label="Stock" onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">In Stock</MenuItem>
          <MenuItem value="false">Out of Stock</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Min Price" name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} />
      <TextField label="Max Price" name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} />
      <Button variant="outlined" onClick={handleReset}>Reset</Button>
    </Box>
  );
}

export default Filters;
