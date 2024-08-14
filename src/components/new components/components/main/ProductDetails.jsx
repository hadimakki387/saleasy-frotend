import { useState } from "react";
import { Box } from "@mui/material";
import ProductImage from "../ProductDetails/ProductImage";
import ProductInfo from "../ProductDetails/ProductInfo";
import ImageSelector from "../ProductDetails/ImageSelector";
import BuyNowButton from "../ProductDetails/BuyNowButton";

const ProductDetails = () => {
  // Hardcoded product data
  const product = {
    productTitle: "Sample Product Title",
    productPrice: "29.99",
    productDescription: "This is a description of the sample product.",
    productImg: [
      { id: 1, url: "image1-url" },
      { id: 2, url: "image2-url" },
      { id: 3, url: "image3-url" },
    ],
  };

  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <ProductImage imageUrl={product.productImg[selectedImg].url} />

      <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
        <ProductInfo
          title={product.productTitle}
          price={product.productPrice}
          description={product.productDescription}
        />

        <ImageSelector
          images={product.productImg}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />

        <BuyNowButton />
      </Box>
    </Box>
  );
};

export default ProductDetails;
