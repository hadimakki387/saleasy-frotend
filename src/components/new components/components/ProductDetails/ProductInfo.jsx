import { Typography } from "@mui/material";

const ProductInfo = ({ title, price, description }) => (
    <>
      <Typography variant="h5">{title}</Typography>
      <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
        ${price}
      </Typography>
      <Typography variant="body1">{description}</Typography>
  
    </>
  );
  
  export default ProductInfo;
  
  


  // import React from 'react';
  // import { Typography } from '@mui/material';
  
  // interface ProductInfoProps {
  //   title: string;
  //   price: number;
  //   description: string;
  // }
  
  // const ProductInfo: React.FC<ProductInfoProps> = ({ title, price, description }) => (
  //   <>
  //     <Typography variant="h5">{title}</Typography>
  //     <Typography my={0.4} fontSize="22px" color="crimson" variant="h6">
  //       ${price}
  //     </Typography>
  //     <Typography variant="body1">{description}</Typography>
  //   </>
  // );
  
  // export default ProductInfo;
  