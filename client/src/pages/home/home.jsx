import { Box, Typography } from "@mui/material";
import { MAIN_HEIGHT } from "../../utils/constants";

const Home = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: MAIN_HEIGHT }}>
      <Typography variant="h2">GraphQL</Typography>
    </Box>
  );
};

export default Home;
