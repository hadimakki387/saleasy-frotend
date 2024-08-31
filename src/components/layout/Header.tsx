import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandMore } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, InputBase, Menu, styled } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useState } from "react";
import Profile from "../SVGs/profile";
import ShoppingBagIcon from "../SVGs/shopping-bag-icon";
import { useParams, useRouter } from "next/navigation";

type Props = {};
const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: "4px",
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const options = ["All Categories", "CAR", "Clothes", "Electronics"];
function Header({}: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const params = useParams();
  const { store, item } = params;
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex items-center justify-between bg-primary text-white xl:px-40 px-4 py-3">
        <div className="text-xs">Free Express Shipping</div>
        <div className="flex items-center gap-3 text-sm">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
      <div className="xl:px-40 px-4 flex items-center justify-between py-4 sticky top-0">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
          onClick={() => {
            router.push(`/store/${store}`);
          }}
        />

        <div className="max-sm:hidden">
          <Search
            sx={{
              display: "flex",
              borderRadius: "4px",
              justifyContent: "space-between",
              border: "1px solid transparent",
              "&:hover": { border: "1px solid transparent" },
              "&:focus": { border: "1px solid var(--button-color)" },
            }}
            className="bg-neutral-100 "
          >
            <SearchIconWrapper>
              <SearchIcon />
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
                  // @ts-ignore
                  borderBottomRightRadius: 4,
                  borderTopRightRadius: 4,
                  p: "0",
                }}
                className="bg-neutral-100"
              >
                <ListItem
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    // className="border"
                    sx={{
                      width: 93,
                      textAlign: "center",
                      "&:hover": { cursor: "pointer" },
                    }}
                    secondary={options[selectedIndex]}
                  />
                  <ExpandMore sx={{ fontSize: "16px" }} />
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
                    sx={{ fontSize: "13px" }}
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Search>
        </div>
        <div className="flex items-center gap-2">
          <Profile />
          <ShoppingBagIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
