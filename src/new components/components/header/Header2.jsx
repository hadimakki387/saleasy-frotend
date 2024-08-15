import { Container } from "@mui/material";
import Logo from "../header2/Logo";
import SearchBar from "../header2/SearchBar";
import ActionIcons from "../header2/ActionIcons";

const Header2 = () => {
  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      <Logo />
      <SearchBar />
      <ActionIcons />
    </Container>
  );
};

export default Header2;
