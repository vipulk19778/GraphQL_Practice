import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";

import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

import {
  MAIN_HEIGHT,
  MAIN_MARGIN_TOP,
  MAIN_PADDING_X,
  MAIN_PADDING_Y,
} from "../utils/constants";

const MainLayout = () => {
  const isLessThanMedium = window.innerWidth < 900;
  const [open, setOpen] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(isLessThanMedium);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleResize = () => {
    setShowMenuIcon(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box>
      <header>
        <Header toggleDrawer={toggleDrawer} showMenuIcon={showMenuIcon} />
      </header>
      <main>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <Sidebar toggleDrawer={toggleDrawer} />
        </Drawer>
        <Box
          sx={{
            minHeight: MAIN_HEIGHT,
            mt: MAIN_MARGIN_TOP,
            px: MAIN_PADDING_X,
            py: MAIN_PADDING_Y,
          }}
        >
          <Outlet />
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};

export default MainLayout;
