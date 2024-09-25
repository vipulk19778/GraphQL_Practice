import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { NAVBAR_ITEMS } from "../utils/constants";

const styles = {
  navLink: {
    color: "#999",
    textDecoration: "none",
    fontWeight: "normal",
    textUnderlineOffset: "4px",
  },
  navLinkActive: {
    color: "white",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

const NavbarItems = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 4,
      }}
    >
      {NAVBAR_ITEMS.map((item) => (
        <Box key={item._id}>
          <NavLink
            to={item.linkName}
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.navLinkActive : {}),
            })}
          >
            {item.displayName}
          </NavLink>
        </Box>
      ))}
    </Box>
  );
};

export default NavbarItems;
