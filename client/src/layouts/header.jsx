import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Button, IconButton } from "@mui/material";
import NavbarItems from "./navbarItems";

const Header = ({ toggleDrawer, showMenuIcon }) => {
  return (
    <AppBar position="fixed" sx={{ background: "#181818" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {showMenuIcon ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box>MyApp</Box>
        )}
        {!showMenuIcon && <NavbarItems />}
        <Button variant="contained" color="success">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
