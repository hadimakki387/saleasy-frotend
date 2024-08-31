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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import AutoCompleteSearch from "../global/SeAutoCompleteSearch";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setIsCartDrawerOpen,
  setIsSearchDialogOpen,
  setIsSearchDrawerOpen,
} from "../global-slice";
import { useRouter as useNextRouter } from "next/router";
import { useAppSelector } from "@/providers/StoreWrapper";

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
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const newUrl = new URLSearchParams(searchParams.toString());
  const path = usePathname();
  const { CartItems } = useAppSelector((state) => state.ItemSlice);

  return (
    <>
      <div className="flex items-center justify-between bg-primary text-white max-sm:px-2 px-4 2xl:px-40 py-3">
        <div className="text-xs">Free Express Shipping</div>
        <div className="flex items-center gap-3 text-sm">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
      <div
        className={`max-sm:px-2 px-4 2xl:px-40 max-lg:grid ${
          path.split("/").filter((e) => e !== "/" && e !== "").length !== 2
            ? "max-lg:grid-cols-6"
            : "max-lg:grid-cols-4"
        } flex items-center justify-between py-4 bg-white sticky top-0 z-50`}
      >
        {path.split("/").filter((e) => e !== "/" && e !== "").length !== 2 && (
          <div className={`flex items-center lg:hidden col-span-2 `}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                dispatch(setIsSearchDrawerOpen(true));
              }}
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
          </div>
        )}
        <div
          className={`flex ${
            path.split("/").filter((e) => e !== "/" && e !== "").length !== 2
              ? "justify-center"
              : "justify-start"
          } items-center col-span-2`}
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="cursor-pointer  "
            onClick={() => {
              router.push(`/store/${store}`);
            }}
          />
        </div>

        <div className="max-lg:hidden col-span-2 flex justify-center items-center">
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
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <AutoCompleteSearch
              formControlSx={{
                "&:focus": { border: "none !important" },
              }}
              placeholder="Search for products"
              sx={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                "&:focus": { boxShadow: "none", border: "none !important" },
                height: "100%",
              }}
              data={[
                {
                  title: "item",
                  id: "value",
                },
                {
                  title: "item2",
                  id: "value2",
                },
                {
                  title: "item3",
                  id: "value3",
                },
              ]}
              setSelectedItem={(e) => {
                newUrl.set("q", e);
                router.push(`/store/${store}/search?${newUrl.toString()}`);
              }}
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
        <div className=" gap-2 col-span-2 flex justify-center items-center max-lg:justify-end">
          <div className="lg:hidden">
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => {
                dispatch(setIsSearchDialogOpen(true));
              }}
            />
          </div>
          <Profile />
          <div
            className="cursor-pointer"
            onClick={() => {
              dispatch(setIsCartDrawerOpen(true));
            }}
          >
            <Badge
              badgeContent={CartItems.length}
              color="error"
              className="max-sm:mr-1"
            >
              <ShoppingBagIcon />
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
