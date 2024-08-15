import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Dialog,
} from '@mui/material';
import ProductCardComponent from '../maincomponents/ProductCardComponent'; // Updated import
import { ActionButton, CloseButton } from '../maincomponents/ButtonComponents';
import ProductDetails from './ProductDetails';
import { AnimatePresence } from 'framer-motion';

const Main = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [myDate, setmyDate] = useState('all');
  const [clickedProduct, setclickedProduct] = useState({});

  const products = {
    all: [
      {
        id: 1,
        productTitle: "Men's Jacket",
        productPrice: "49.99",
        productImg: [
          { url: "https://example.com/images/mens-jacket-1.jpg" },
          { url: "https://example.com/images/mens-jacket-2.jpg" },
        ],
        productRating: 4.5,
      },
      {
        id: 2,
        productTitle: "Women's Dress",
        productPrice: "69.99",
        productImg: [
          { url: "https://example.com/images/womens-dress-1.jpg" },
          { url: "https://example.com/images/womens-dress-2.jpg" },
        ],
        productRating: 4.7,
      },
    ],
    men: [
      {
        id: 1,
        productTitle: "Men's Jacket",
        productPrice: "49.99",
        productImg: [
          { url: "https://example.com/images/mens-jacket-1.jpg" },
          { url: "https://example.com/images/mens-jacket-2.jpg" },
        ],
        productRating: 4.5,
      },
    ],
    women: [
      {
        id: 2,
        productTitle: "Women's Dress",
        productPrice: "69.99",
        productImg: [
          { url: "https://example.com/images/womens-dress-1.jpg" },
          { url: "https://example.com/images/womens-dress-2.jpg" },
        ],
        productRating: 4.7,
      },
    ],
  };

  const handleAlignment = (event, newValue) => {
    if (newValue !== null) {
      setmyDate(newValue);
    }
  };

  const handleClickOpen = (product) => {
    setclickedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = products[myDate];

  return (
    <Container sx={{ py: 9 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          color="error"
          value={myDate}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
            },
          }}
        >
          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value="all"
            aria-label="left aligned"
          >
            All Products
          </ToggleButton>

          <ToggleButton
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
            className="myButton"
            value="men"
            aria-label="centered"
          >
            MEN category
          </ToggleButton>

          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value="women"
            aria-label="right aligned"
          >
            Women category
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <AnimatePresence>
          {data.map((item) => (
            <ProductCardComponent
              product={item}
              onOpen={handleClickOpen}
              key={item.id}
            />
          ))}
        </AnimatePresence>
      </Stack>

      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CloseButton onClick={handleClose} />
        <ProductDetails clickedProduct={clickedProduct} />
      </Dialog>
    </Container>
  );
};

export default Main;
