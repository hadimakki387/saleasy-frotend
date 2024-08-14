// src/components/Header2/ActionIcons.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

const ActionIcons = () => (
  <div>
    <IconButton aria-label="notifications">
      <NotificationsOutlined />
    </IconButton>
    <IconButton aria-label="account">
      <AccountCircleOutlined />
    </IconButton>
  </div>
);

export default ActionIcons;




// import { FC } from "react";
// import { Stack, IconButton, Badge } from "@mui/material";
// import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { styled } from "@mui/material/styles";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: "0 4px",
//   },
// }));

// const ActionIcons: FC = () => (
//   <Stack direction={"row"} alignItems={"center"}>
//     <IconButton aria-label="cart">
//       <StyledBadge badgeContent={4} color="primary">
//         <ShoppingCartIcon />
//       </StyledBadge>
//     </IconButton>
//     <IconButton aria-label="account">
//       <Person2OutlinedIcon />
//     </IconButton>
//   </Stack>
// );

// export default ActionIcons;


