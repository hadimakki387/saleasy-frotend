import { ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";

const ImageSelector = ({ images, selectedImg, setSelectedImg }) => (
  <Stack
    sx={{ justifyContent: { xs: "center", sm: "left" } }}
    direction={"row"}
    gap={1}
    my={2}
  >
    <ToggleButtonGroup
      value={selectedImg}
      exclusive
      onChange={(event, newValue) => {
        if (newValue !== null) {
          setSelectedImg(newValue);
        }
      }}
      sx={{
        ".Mui-selected": {
          border: "1px solid royalblue !important",
          borderRadius: "5px !important",
          opacity: "1",
          backgroundColor: "initial",
        },
      }}
    >
      {images.map((item, index) => (
        <ToggleButton
          key={item.id}
          value={index}
          sx={{
            width: "110px",
            height: "110px",
            mx: 1,
            p: "0",
            opacity: "0.5",
          }}
        >
          <img
            style={{ borderRadius: 3 }}
            height={"100%"}
            width={"100%"}
            src={item.url}
            alt={`Product ${index + 1}`} // Corrected here
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Stack>
);

export default ImageSelector;





// import React from 'react';
// import { ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';

// interface Image {
//   id: string;
//   url: string;
// }

// interface ImageSelectorProps {
//   images: Image[];
//   selectedImg: number | null;
//   setSelectedImg: (value: number | null) => void;
// }

// const ImageSelector: React.FC<ImageSelectorProps> = ({ images, selectedImg, setSelectedImg }) => (
//   <Stack
//     sx={{ justifyContent: { xs: 'center', sm: 'left' } }}
//     direction="row"
//     gap={1}
//     my={2}
//   >
//     <ToggleButtonGroup
//       value={selectedImg}
//       exclusive
//       onChange={(event, newValue) => {
//         if (newValue !== null) {
//           setSelectedImg(newValue);
//         }
//       }}
//       sx={{
//         '.Mui-selected': {
//           border: '1px solid royalblue !important',
//           borderRadius: '5px !important',
//           opacity: '1',
//           backgroundColor: 'initial',
//         },
//       }}
//     >
//       {images.map((item, index) => (
//         <ToggleButton
//           key={item.id}
//           value={index}
//           sx={{
//             width: '110px',
//             height: '110px',
//             mx: 1,
//             p: '0',
//             opacity: '0.5',
//           }}
//         >
//           <img
//             style={{ borderRadius: 3 }}
//             height="100%"
//             width="100%"
//             src={item.url}
//             alt={`Product ${index + 1}`}
//           />
//         </ToggleButton>
//       ))}
//     </ToggleButtonGroup>
//   </Stack>
// );

// export default ImageSelector;

