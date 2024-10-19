import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandMore } from "@mui/icons-material";
import { Badge, Divider, Menu, styled } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setIsAuthecationDialogOpen,
  setIsCartDrawerOpen,
  setIsLoginDialogOpen,
  setIsSearchDialogOpen,
  setIsSearchDrawerOpen,
} from "@/components/global-slice";
import CustomImage from "@/components/global/CustomImage";
import AutoCompleteSearch from "@/components/global/SeAutoCompleteSearch";
import SeButton from "@/components/global/SeButton";
import SeTextField from "@/components/global/SeTextField";
import Profile from "@/components/SVGs/profile";
import ShoppingBagIcon from "@/components/SVGs/shopping-bag-icon";
import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";
import { useSearchItemsQuery } from "@/core/features/customer/search-page/redux/rtk";
import { useAppSelector } from "@/providers/StoreWrapper";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../../items/redux/rtk";
import { useUpdateStoreHeaderMutation } from "../redux/rtk";
import { toast } from "sonner";

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

function HeaderEdit({ link }: Props) {
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
    router.push(`/${store}/search?${param.toString()}`);
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

  //////////edit part

  const [edit, setEdit] = useState(false);
  const [smallTopRightText, setSmallTopRightText] = useState(
    link.link.header.shippingFee
  );
  const [image, setImage] = useState<File | null>();
  const [instagram, setInstagram] = useState(link.link.header.links?.instagram);
  const [facebook, setFacebook] = useState(link.link.header.links?.facebook);
  const [twitter, setTwitter] = useState(link.link.header.links?.twitter);
  const [logoSize, setLogoSize] = useState(link.link.header.logoSize || 100);
  const [
    uploadImage,
    {
      isLoading: loadingUploadImage,
      isSuccess: successUploadImage,
      isError: errorUploadImage,
    },
  ] = useUploadImageMutation();

  const [
    updateHeader,
    {
      isLoading: loadingUpdateHeader,
      isSuccess: successUpdateHeader,
      isError: errorUpdateHeader,
    },
  ] = useUpdateStoreHeaderMutation();
  const [
    deleteImage,
    {
      isLoading: loadingDeleteImage,
      isSuccess: successDeleteImage,
      isError: errorDeleteImage,
    },
  ] = useDeleteImageMutation();

  const handleUploadImage = async (
    image: File | null | undefined
  ): Promise<{
    image: string;
    isNewUploaded: boolean;
  }> => {
    if (!image) {
      return Promise.resolve({
        image: link.link.header.logo,
        isNewUploaded: false,
      });
    }
    const formData = new FormData();
    formData.append("file", image);
    return uploadImage(formData)
      .unwrap()
      .then((res) => {
        return {
          image: res.id,
          isNewUploaded: true,
        };
      });
  };
  console.log(image);

  return (
    <>
      <div className="text-xl text-primary font-semibold mb-4">
        Header Section
      </div>
      <div className="flex items-center justify-between bg-primary text-white max-sm:px-2 px-4 2xl:px-40 py-3">
        {!edit ? (
          <div className="text-xs">{link.link.header.shippingFee}</div>
        ) : (
          <SeTextField
            className="w-40 "
            sx={{
              "& .MuiOutlinedInput-input": {
                color: "white",
                fontSize: "12px",
              },
            }}
            value={smallTopRightText}
            onChange={(e) => {
              setSmallTopRightText(e.target.value);
            }}
          />
        )}
        <div className="flex items-center gap-3 text-sm">
          <Link href={link.link.header.links?.instagram || ""} target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href={link.link.header.links?.facebook || ""} target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href={link.link.header.links?.twitter || ""} target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
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
          {edit ? (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <CustomImage
                  stateImage={image}
                  src={!image ? link.link.header.logo : ""}
                  size={logoSize || 100}
                  className=""
                  alt="image"
                />
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    <input
                      onChange={(e) => {
                        if (!e.target.files?.length) return;
                        setImage(e.target.files[0]);
                      }}
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <CustomImage
              src={link.link.header.logo}
              alt="logo"
              size={link.link.header.logoSize || 100}
              className="cursor-pointer  "
              onClick={() => {}}
            />
          )}
        </div>

        <div className="max-lg:hidden col-span-2 flex justify-center items-center">
          <Search
            sx={{
              display: "flex",
              borderRadius: "4px",
              justifyContent: "space-between",
              border: "1px solid transparent",
              "&:hover": { border: "1px solid transparent" },
              "&:focus": { border: "1px solid var(--error)" },
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
              handleSubmit={() => {}}
              setSelectedItem={(e) => {}}
            />
            <div
              className="flex items-center justify-center text-sub-title-text cursor-pointer"
              onClick={() => {}}
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
              onClick={() => {}}
              className="text-primary"
            />
          </div>
          <div className="cursor-pointer" onClick={() => {}}>
            <Profile fill="var(--primary)" />
          </div>
          <div className="cursor-pointer" onClick={() => {}}>
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
      <div className="mt-4">
        {edit && (
          <div className="flex items-center gap-4">
            <SeTextField
              label="Logo Size"
              value={logoSize}
              type="number"
              onChange={(e) => {
                setLogoSize(Number(e.target.value));
              }}
            />
            px
          </div>
        )}
      </div>

      {edit && (
        <>
          <Divider className="pt-2" />
          <div className="space-y-3 mb-4 pt-2">
            <p>Edit Socials</p>
            <SeTextField
              label="Instagram"
              value={instagram}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
            />
            <SeTextField
              label="Facebook"
              value={facebook}
              onChange={(e) => {
                setFacebook(e.target.value);
              }}
            />
            <SeTextField
              label="Twitter"
              value={twitter}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
            />
          </div>
        </>
      )}
      <SeButton
        loading={loadingUpdateHeader || loadingUploadImage}
        variant="contained"
        color_custom="admin-primary"
        label={edit ? "Save" : "Edit"}
        onClick={() => {
          if (!edit) {
            setEdit(!edit);
          } else {
            handleUploadImage(image)
              .then((uploadImage) => {
                updateHeader({
                  header: {
                    logo: uploadImage.image,
                    logoSize,
                    isNewUploaded: uploadImage.isNewUploaded,
                    links: {
                      facebook: facebook || link.link.header.links?.facebook,
                      instagram: instagram || link.link.header.links?.instagram,
                      twitter: twitter || link.link.header.links?.twitter,
                    },
                    shippingFee: smallTopRightText,
                  },
                  storeId: store as string,
                })
                  .unwrap()
                  .then((res) => {
                    console.log("this is teh res", res);
                    toast.success("Header Updated");
                    setEdit(!edit);
                    setImage(null);
                    setInstagram(res.links.instagram);
                    setFacebook(res.links.facebook);
                    setTwitter(res.links.twitter);
                    setSmallTopRightText(res.shippingFee);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Error Updating Header");
                    deleteImage({ id: uploadImage.image });
                  });
              })
              .catch((err) => {
                console.log(err);
                toast.error("Error Uploading Image");
              });
          }
        }}
      />
    </>
  );
}

export default HeaderEdit;
