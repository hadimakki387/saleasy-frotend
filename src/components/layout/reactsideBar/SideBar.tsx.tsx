"use client";
import { setToggle } from "@/components/global-slice";
import { useAppSelector } from "@/providers/StoreWrapper";
import { NavItems } from "@/services/NavItems";
import { CircularProgress, rgbToHex } from "@mui/material";
import { useParams, usePathname,  } from "next/navigation";
import React from "react";
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { SidebarHeader } from "./components/SidebarHeader";
import { Typography } from "./components/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "nextjs-toploader/app";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "var(--primary)",
      color: "#dae1e7",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "transparent",
        color: "#dae1e7",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const SideBar: React.FC = () => {
  const Items = NavItems();
  const path = usePathname();
  const splitPath = path.split("/");
  const noSubItemPath = `/${splitPath[splitPath.length - 1]}`;
  const subItemPath = `/${splitPath[splitPath.length - 2]}/${
    splitPath[splitPath.length - 1]
  }`;

  const { user, toggle } = useAppSelector((state) => state.GlobalSlice);

  const [collapsed, setCollapsed] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const router = useRouter();

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRtl(e.target.checked);
  };

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes["light"].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes["light"].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: themes["light"].sidebar.backgroundColor,
    }),

    button: {
      margin: "0 1rem",
      borderRadius: "8px",
      [`&.${menuClasses.disabled}`]: {
        color: themes["light"].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: themes["light"].menu.hover.backgroundColor,
        color: themes["light"].menu.hover.color,
        transition: "all 0.2s ease",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  const dispatch = useDispatch();
  const { store } = useParams();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        direction: rtl ? "rtl" : "ltr",
        position: "fixed",
      }}
      className=" z-20"
    >
      {Items ? (
        <Sidebar
          collapsed={collapsed}
          toggled={toggle}
          onBackdropClick={() => dispatch(setToggle(false))}
          onBreakPoint={setBroken}
          rtl={rtl}
          breakPoint="md"
          backgroundColor={hexToRgba(
            themes["light"].sidebar.backgroundColor,
            hasImage ? 0.9 : 1
          )}
          rootStyles={{
            color: themes["light"].sidebar.color,
            width: "15vw",
            borderRight: "2px solid #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: themes["light"].sidebar.backgroundColor,
            }}
          >
            <SidebarHeader
              rtl={rtl}
              style={{ marginBottom: "24px", marginTop: "16px" }}
            />

            <div style={{ flex: 1, marginBottom: "32px" }}>
              {Items?.map((item, index) => {
                return (
                  <div key={index}>
                    {item.title && (
                      <div
                        style={{
                          padding: "0 24px",
                          marginBottom: "8px",
                          marginTop: "32px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          style={{
                            opacity: collapsed ? 0 : 0.7,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </div>
                    )}
                    {item?.links?.map((link, index) => {
                      if (!link.hasSubItems) {
                        return (
                          <Menu menuItemStyles={menuItemStyles} key={index}>
                            <MenuItem
                              icon={link.icon({
                                size: 24,
                                fill:
                                  noSubItemPath === `${link.path}`
                                    ? "#3e8bfd"
                                    : "#dae1e7",
                              })}
                              onClick={() =>
                                router.push(
                                  `/admin/store/${store}/${link.path}`
                                )
                              }
                              style={{
                                fontWeight: 500,
                                // color:
                                //   noSubItemPath === `${link.path}`
                                //     ? "var(--primary)"
                                //     : "",
                                backgroundColor:
                                  noSubItemPath === `${link.path}`
                                    ? "#323b4c"
                                    : "",
                              }}
                            >
                              {link.label}
                            </MenuItem>
                          </Menu>
                        );
                      }
                      if (link.hasSubItems && link.subItems) {
                        return (
                          <Menu menuItemStyles={menuItemStyles} key={index}>
                            <SubMenu
                              label={link.label}
                              icon={link.icon({ size: 24, fill: "#dae1e7" })}

                              //this is for some notifications
                              // suffix={
                              //   <Badge variant="danger" shape="circle">
                              //     6
                              //   </Badge>
                              // }
                            >
                              {link.subItems.length > 0 ? (
                                link.subItems.map((subItem, index: number) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      onClick={() =>
                                        router.push(
                                          `/admin/store/${store}/${link.path}/${subItem?.path}`
                                        )
                                      }
                                      style={{
                                        fontWeight: 500,
                                        color: "#dae1e7",
                                        backgroundColor:
                                          noSubItemPath === `${subItem?.path}`
                                            ? "#323b4c"
                                            : "",
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`w-[4px] h-[4px] rounded-full ${
                                            noSubItemPath === `${subItem?.path}`
                                              ? "bg-[#4e97fd] "
                                              : "bg-[#dae1e7]"
                                          }`}
                                        ></div>
                                        {subItem?.label}
                                      </div>
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem>no Items</MenuItem>
                              )}
                            </SubMenu>
                          </Menu>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Sidebar>
      ) : (
        <div
          style={{
            height: "90vh",
            direction: rtl ? "rtl" : "ltr",
            backgroundColor: "[#dae1e7]",
            width: "15vw",
            borderRight: "2px solid #e0e0e0",
          }}
          className=" bg-[#dae1e7] fixed flex justify-center items-center max-md:hidden"
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
