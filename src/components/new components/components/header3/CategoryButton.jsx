import { useState } from "react";
import { Button, Menu, MenuItem, Typography, Box } from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useTheme } from "@mui/material/styles";
import ElectricBikeOutlined from "@mui/icons-material/ElectricBikeOutlined";
import LaptopChromebookOutlined from "@mui/icons-material/LaptopChromebookOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import SportsEsportsOutlined from "@mui/icons-material/SportsEsportsOutlined";

const CategoryButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const theme = useTheme();

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: 222,
          bgcolor: theme.palette.myColor.main,
          color: theme.palette.text.secondary,
        }}
      >
        <WindowIcon />
        <Typography
          sx={{
            padding: "0",
            textTransform: "capitalize",
            mx: 1,
          }}
        >
          Categories
        </Typography>
        <Box flexGrow={1} />
        <KeyboardArrowRightOutlinedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            width: 220,
            bgcolor: theme.palette.myColor.main,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ElectricBikeOutlined fontSize="small" />
          <Typography>Bikes</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LaptopChromebookOutlined fontSize="small" />
          <Typography>Electronics</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MenuBookOutlined fontSize="small" />
          <Typography>Books</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SportsEsportsOutlined fontSize="small" />
          <Typography>Games</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CategoryButton;



// import React, { MouseEvent } from 'react';
// import { useState } from 'react';
// import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
// import WindowIcon from '@mui/icons-material/Window';
// import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
// import { useTheme } from '@mui/material/styles';
// import ElectricBikeOutlined from '@mui/icons-material/ElectricBikeOutlined';
// import LaptopChromebookOutlined from '@mui/icons-material/LaptopChromebookOutlined';
// import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
// import SportsEsportsOutlined from '@mui/icons-material/SportsEsportsOutlined';

// const CategoryButton: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const theme = useTheme();

//   return (
//     <>
//       <Button
//         id="basic-button"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//         sx={{
//           width: 222,
//           bgcolor: theme.palette.myColor.main,
//           color: theme.palette.text.secondary,
//         }}
//       >
//         <WindowIcon />
//         <Typography
//           sx={{
//             padding: "0",
//             textTransform: "capitalize",
//             mx: 1,
//           }}
//         >
//           Categories
//         </Typography>
//         <Box flexGrow={1} />
//         <KeyboardArrowRightOutlinedIcon />
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//         sx={{
//           ".MuiPaper-root": {
//             width: 220,
//             bgcolor: theme.palette.myColor.main,
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>
//           <ElectricBikeOutlined fontSize="small" />
//           <Typography>Bikes</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <LaptopChromebookOutlined fontSize="small" />
//           <Typography>Electronics</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <MenuBookOutlined fontSize="small" />
//           <Typography>Books</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <SportsEsportsOutlined fontSize="small" />
//           <Typography>Games</Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default CategoryButton;
