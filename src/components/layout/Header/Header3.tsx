import React, { useState, MouseEvent } from "react";
import {
    Box,
    Container,
    Drawer,
    IconButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
    Menu,
    MenuItem,
    Accordion,
    AccordionSummary,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Close, ElectricBikeOutlined, LaptopChromebookOutlined, MenuBookOutlined, SportsEsportsOutlined } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Links from "./Links"; // Adjust based on your file structure

const Header3: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: "top" | "left" | "bottom" | "right", open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === "keydown" && (event as React.KeyboardEvent).key === "Tab") {
                return;
            }
            setState({ ...state, [anchor]: open });
        };

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center-align the content
                mt: 5,
                position: 'relative'
            }}
        >
            {useMediaQuery("(min-width:1200px)") && (
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={4}
                    sx={{ position: 'absolute', left: 0 }} // Position before centered content
                >
                    <Links title={"Home"} />
                    <Links title={"Mega Menu"} />
                    <Links title={"Full Screen Menu"} />
                </Stack>
            )}

            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={4}
                sx={{ flexGrow: 1, justifyContent: 'center' }} // Center the content in the middle
            >
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                        width: 222,
                        bgcolor: theme.palette.myColor?.main, // Ensure myColor exists in the theme
                        color: theme.palette.text.secondary,
                    }}
                >
                    <Typography sx={{ padding: "0", textTransform: "capitalize", mx: 1 }}>
                        Categories
                    </Typography>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    sx={{
                        ".MuiPaper-root": {
                            width: 220,
                            bgcolor: theme.palette.myColor?.main,
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ElectricBikeOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Bikes</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LaptopChromebookOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Electronics</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <MenuBookOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Books</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SportsEsportsOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Games</ListItemText>
                    </MenuItem>
                </Menu>
            </Stack>

            {useMediaQuery("(min-width:1200px)") && (
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={4}
                    sx={{ position: 'absolute', right: 0 }} // Position after centered content
                >
                    <Links title={"Pages"} />
                    <Links title={"User Account"} />
                    <Links title={"Vendor Account"} />
                </Stack>
            )}

            {useMediaQuery("(max-width:1200px)") && (
                <IconButton onClick={toggleDrawer("top", true)} sx={{ position: 'absolute', right: 0 }}>
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                anchor={"top"}
                open={state["top"]}
                onClose={toggleDrawer("top", false)}
                sx={{
                    ".MuiPaper-root": {
                        height: "100%",
                    },
                }}
            >
                <Box
                    sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}
                >
                    <IconButton
                        sx={{
                            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
                            position: "absolute",
                            top: 0,
                            right: 10,
                        }}
                        onClick={toggleDrawer("top", false)}
                    >
                        <Close />
                    </IconButton>

                    {[
                        { mainLink: "Home", subLinks: ["Link 1", "Link 2", "Link 3"] },
                        { mainLink: "Mega Menu", subLinks: ["Link 1", "Link 2", "Link 3"] },
                        { mainLink: "Full Screen Menu", subLinks: ["Link 1", "Link 2", "Link 3"] },
                        { mainLink: "Pages", subLinks: ["Link 1", "Link 2", "Link 3"] },
                        { mainLink: "User Account", subLinks: ["Link 1", "Link 2", "Link 3"] },
                        { mainLink: "Vendor Account", subLinks: ["Link 1", "Link 2", "Link 3"] },
                    ].map((item) => (
                        <Accordion key={item.mainLink} elevation={0} sx={{ bgcolor: "initial" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{item.mainLink}</Typography>
                            </AccordionSummary>

                            <List sx={{ py: 0, my: 0 }}>
                                {item.subLinks.map((link) => (
                                    <ListItem key={link} sx={{ py: 0, my: 0 }}>
                                        <ListItemButton>
                                            <ListItemText primary={link} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Accordion>
                    ))}
                </Box>
            </Drawer>
        </Container>
    );
};

export default Header3;
