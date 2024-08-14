import React from 'react';
import { Card as MuiCard, CardActions, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'; 
import { ActionButton } from './ButtonComponents'; // Adjust the path as necessary

const ProductCardComponent = ({ product, onOpen }) => {
  return (
    <MuiCard
      component={motion.section}
      layout
      initial={{ transform: 'scale(0)' }}
      animate={{ transform: 'scale(1)' }}
      transition={{ duration: 1.6, type: 'spring', stiffness: 50 }}
      key={product.id}
      sx={{
        maxWidth: 333,
        mt: 6,
        ":hover .MuiCardMedia-root": {
          rotate: '1deg',
          scale: '1.1',
          transition: '0.35s',
        },
      }}
    >
      <CardMedia
        sx={{ height: 277 }}
        image={product.productImg[0].url} // Corrected here
        title={product.productTitle}
      />

      <CardContent>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography gutterBottom variant="h6" component="div">
            {product.productTitle}
          </Typography>

          <Typography variant="subtitle1" component="p">
            ${product.productPrice}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          This is a brief description of the product.
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <ActionButton
          onClick={() => onOpen(product)}
          label="add to cart"
          icon={<AddShoppingCartOutlinedIcon fontSize="small" />} // Ensure this is used correctly
        />
        <Rating
          precision={0.1}
          name="read-only"
          value={product.productRating}
          readOnly
        />
      </CardActions>
    </MuiCard>
  );
};

export default ProductCardComponent;







// import React from 'react';
// import { Card as MuiCard, CardActions, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
// import { motion } from 'framer-motion';
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import { ActionButton } from './ButtonComponents'; // Adjust the path as necessary

// interface Product {
//   id: string;
//   productImg: { url: string }[];
//   productTitle: string;
//   productPrice: number;
//   productRating: number;
// }

// interface ProductCardComponentProps {
//   product: Product;
//   onOpen: (product: Product) => void;
// }

// const ProductCardComponent: React.FC<ProductCardComponentProps> = ({ product, onOpen }) => {
//   return (
//     <MuiCard
//       component={motion.section}
//       layout
//       initial={{ transform: 'scale(0)' }}
//       animate={{ transform: 'scale(1)' }}
//       transition={{ duration: 1.6, type: 'spring', stiffness: 50 }}
//       key={product.id}
//       sx={{
//         maxWidth: 333,
//         mt: 6,
//         ":hover .MuiCardMedia-root": {
//           rotate: '1deg',
//           scale: '1.1',
//           transition: '0.35s',
//         },
//       }}
//     >
//       <CardMedia
//         sx={{ height: 277 }}
//         image={product.productImg[0].url}
//         title={product.productTitle}
//       />

//       <CardContent>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography gutterBottom variant="h6" component="div">
//             {product.productTitle}
//           </Typography>

//           <Typography variant="subtitle1" component="p">
//             ${product.productPrice}
//           </Typography>
//         </Stack>

//         <Typography variant="body2" color="text.secondary">
//           This is a brief description of the product.
//         </Typography>
//       </CardContent>

//       <CardActions sx={{ justifyContent: 'space-between' }}>
//         <ActionButton
//           onClick={() => onOpen(product)}
//           label="add to cart"
//           icon={<AddShoppingCartOutlinedIcon fontSize="small" />}
//         />
//         <Rating
//           precision={0.1}
//           name="read-only"
//           value={product.productRating}
//           readOnly
//         />
//       </CardActions>
//     </MuiCard>
//   );
// };

// export default ProductCardComponent;
