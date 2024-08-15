import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { MouseEvent, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: "22px",
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["All Categories", "CAR", "Clothes", "Electronics"];

const Header2: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      <Stack alignItems={"center"}>
        icon
        <Typography variant="body2">E-commerce</Typography>
      </Stack>

      <Search className="relative flex items-center border rounded-full hover:border-gray-900 ml-0 mr-2">
        <SearchIconWrapper>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />

        <div>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              bgcolor: theme.palette.myColor.main,
              borderBottomRightRadius: "22px",
              borderTopRightRadius: "22px",
              p: "0",
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              className="cursor-pointer text-center"
            >
              <ListItemText
                secondary={options[selectedIndex]}
                sx={{
                  width: "93px",
                  textAlign: "center",
                }}
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
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
                sx={{ fontSize: "13px" }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>

      <Stack direction={"row"} alignItems={"center"}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            icon
          </StyledBadge>
        </IconButton>

        <IconButton>icon</IconButton>
      </Stack>
    </Container>
  );
};

export default Header2;
