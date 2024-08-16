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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

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
              <FontAwesomeIcon
                icon={colorMode.mode === "light" ? faSun : faMoon}
                className={colorMode.mode === "light" ? "text-yellow-500" : "text-gray-500"}
              />
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
              <FontAwesomeIcon icon={faChevronDown} fontSize={8} />
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

          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faXTwitter} className="text-blue-600" />
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
            <FontAwesomeIcon icon={faInstagram} className="text-pink-600" />
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;
