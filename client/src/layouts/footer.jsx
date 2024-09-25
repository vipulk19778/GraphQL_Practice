import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#181818",
        color: "white",
        height: "50px",
        display: "grid",
        placeItems: "center",
        postion: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography>© 2024 All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
