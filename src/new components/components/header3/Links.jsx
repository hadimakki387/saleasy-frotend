

import React from 'react';
import { Typography, Button } from '@mui/material';

interface LinksProps {
  title: string;
}

const Links: React.FC<LinksProps> = ({ title }) => (
  <Button>
    <Typography>{title}</Typography>
  </Button>
);

export default Links;
