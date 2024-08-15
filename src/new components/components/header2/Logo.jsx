


import React from 'react';
import { Stack, Typography } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

const Logo: React.FC = () => (
  <Stack alignItems="center">
    <ShoppingCartOutlined />
    <Typography variant="body2">E-commerce</Typography>
  </Stack>
);

export default Logo;
