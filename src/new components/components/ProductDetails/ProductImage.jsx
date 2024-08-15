


import React from 'react';
import { Box } from '@mui/material';

interface ProductImageProps {
  imageUrl: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => (
  <Box sx={{ display: 'flex' }}>
    <img width={360} src={imageUrl} alt="Product" />
  </Box>
);

export default ProductImage;

