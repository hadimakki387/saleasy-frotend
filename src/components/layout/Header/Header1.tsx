import { useContext, useState } from "react";
import { ColorModeContext } from "../../../theme/theme";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const options = ["AR", "EN"];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="bg-[#2B3445] py-1 rounded-b-lg">
      <Container>
        <Stack direction="row" alignItems="center">
          <Typography className="mr-2 px-2 py-1 bg-[#D23F57] rounded-md text-white text-xs font-bold">
            HOT
          </Typography>
          <Typography className="text-xs font-light text-white">
            Free Express Shipping
          </Typography>

          <Box className="flex-grow" />

          <div>
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  colorMode.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              {colorMode.mode === "light" ? "Light Mode" : "Dark Mode"}
            </IconButton>
          </div>

          <List
            component="nav"
            aria-label="Device settings"
            className="p-0 m-0"
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              className="cursor-pointer px-1"
            >
              <ListItemText
                secondary={options[selectedIndex]}
                primaryTypographyProps={{ className: "text-white text-xs" }}
              />
              icon
            </ListItem>
          </List>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                className="text-xs p-1 min-h-[10px]"
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          <div>icon</div>
          <div>icon</div>
          <div>icon</div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;
