


import { FC } from "react";
import { Stack, IconButton, Badge } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ActionIcons: FC = () => (
  <Stack direction={"row"} alignItems={"center"}>
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="primary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    <IconButton aria-label="account">
      <Person2OutlinedIcon />
    </IconButton>
  </Stack>
);

export default ActionIcons;

