import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Home, Person, Movie } from "@mui/icons-material";

import { NAVBAR_ITEMS } from "../utils/constants";

const styles = {
  navLink: {
    color: "#999",
    textDecoration: "none",
    fontWeight: "normal",
    cursor: "pointer",
  },
  navLinkActive: {
    color: "purple",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

const getIcon = (iconName) => {
  switch (iconName) {
    case "Home":
      return <Home />;
    case "User":
      return <Person />;
    case "Movie":
      return <Movie />;
    default:
      return null;
  }
};

const Sidebar = ({ toggleDrawer }) => {
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      sx={{ width: 200, py: "20px" }}
    >
      {NAVBAR_ITEMS.map((item) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: "10px",
            py: "5px",
            mx: "auto",
            mb: "2px",
          }}
        >
          {getIcon(item.iconName)}
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

export default Sidebar;
