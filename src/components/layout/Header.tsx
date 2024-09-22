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
import { useEffect, useState } from "react";
import Profile from "../SVGs/profile";
import ShoppingBagIcon from "../SVGs/shopping-bag-icon";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import AutoCompleteSearch from "../global/SeAutoCompleteSearch";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setIsAuthecationDialogOpen,
  setIsCartDrawerOpen,
  setIsLoginDialogOpen,
  setIsSearchDialogOpen,
  setIsSearchDrawerOpen,
} from "../global-slice";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useRouter } from "nextjs-toploader/app";
import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";
import CustomImage from "../global/CustomImage";
import Link from "next/link";
import { useSearchItemsQuery } from "@/core/features/customer/search-page/redux/rtk";

type Props = {
  link: ILinkEntity;
};
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

function Header({ link }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: any) => {
    const getItem = link.categories.find((e, i) => i === index);
    if (!getItem) return;
    const param = new URLSearchParams();
    param.set("category", getItem?.id);
    router.push(`/store/${store}/search?${param.toString()}`);
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

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
  const { data: searchItems, isLoading: loadingSearchItems } =
    useSearchItemsQuery({
      name: debouncedSearch,
      limit: 5,
      storeId: store as string,
    });

  return (
    <>
      <div className="flex items-center justify-between bg-primary text-white max-sm:px-2 px-4 2xl:px-40 py-3">
        <div className="text-xs">{link.link.header.shippingFee}</div>
        <div className="flex items-center gap-3 text-sm">
          {link.link.header.links.instagram && (
            <Link href={link.link.header.links.instagram} target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          )}
          {link.link.header.links.facebook && (
            <Link href={link.link.header.links.instagram} target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          )}
          {link.link.header.links.twitter && (
            <Link href={link.link.header.links.instagram} target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
          )}
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
          <CustomImage
            src={link.link.header.logo}
            alt="logo"
            size={link.link.header?.logoSize || 100}
            className="cursor-pointer"
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
              loading={loadingSearchItems}
              setSearch={(e) => {
                console.log(e);
                setSearch(e);
              }}
              data={
                searchItems?.data?.map((e) => ({
                  title: e.name,
                  id: e.id,
                })) || []
              }
              handleSubmit={() => {
                newUrl.set("q", search);
                router.push(`/store/${store}/search?${newUrl.toString()}`);
              }}
              setSelectedItem={(e) => {
                newUrl.set(
                  "q",
                  searchItems?.data.find((i) => i.id === e)?.name as string
                );
                router.push(`/store/${store}/search?${newUrl.toString()}`);
              }}
            />{" "}
            <div
              className="flex items-center justify-center text-sub-title-text cursor-pointer"
              onClick={() => {
                newUrl.set("q", debouncedSearch);
                router.push(`/store/${store}/search?${newUrl.toString()}`);
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
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
                    secondary={link.categories[selectedIndex].name}
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
                {link.categories?.map((option, index) => (
                  <MenuItem
                    sx={{ fontSize: "13px" }}
                    key={option.name}
                    selected={index === selectedIndex}
                    onClick={(event) => {
                      console.log(event);
                      handleMenuItemClick(event, index);
                    }}
                  >
                    {option.name}
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
              className="text-primary"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              dispatch(setIsAuthecationDialogOpen(true));
              dispatch(setIsLoginDialogOpen(true));
            }}
          >
            <Profile fill="var(--primary)" />
          </div>
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
              <ShoppingBagIcon fill="var(--primary)" />
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
