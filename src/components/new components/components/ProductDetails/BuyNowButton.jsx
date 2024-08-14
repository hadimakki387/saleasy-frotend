import { Button } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";

const BuyNowButton = () => (
  <Button
    sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
    variant="contained"
    startIcon={<AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />}
  >
    Buy now
  </Button>
);

export default BuyNowButton;



// import React from 'react';
// import { Button } from "@mui/material";
// import { AddShoppingCartOutlined } from "@mui/icons-material";

// const BuyNowButton: React.FC = () => (
//   <Button
//     sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
//     variant="contained"
//     startIcon={<AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />}
//   >
//     Buy now
//   </Button>
// );

// export default BuyNowButton;
