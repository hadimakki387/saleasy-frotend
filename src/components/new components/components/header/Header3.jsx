import { Container, Box, Stack, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryButton from "../header3/CategoryButton";
import DrawerMenu from "../header3/DrawerMenu";
import Links from "./Links";


const Header3 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 5,
      }}
    >
      <Box>
        <CategoryButton />
      </Box>

      {useMediaQuery("(min-width:1200px)") && (
        <Stack gap={4} direction={"row"} alignItems={"center"}>
          <Links title={"Home"} />
          <Links title={"Mega Menu"} />
          <Links title={"Full Screen Menu"} />
          <Links title={"pages"} />
          <Links title={"User Account"} />
          <Links title={"Vendor Account"} />
        </Stack>
      )}

      {useMediaQuery("(max-width:1200px)") && (
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      )}

      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />
    </Container>
  );
};

export default Header3;
