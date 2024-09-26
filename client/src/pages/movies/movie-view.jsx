import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Close from "@mui/icons-material/Close";

const MovieView = ({ handleDialogClose, movie }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
          gap: 2,
        }}
      >
        <Typography variant="h5" color="primary">
          Movie Details
        </Typography>
        <Close onClick={handleDialogClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Card elevation={3}>
        <CardContent sx={{ py: 0 }}>
          <h2>{movie.name}</h2>
          <p>Year Of Publication: {movie.yearOfPublication}</p>
          <p>Is In Theatres: {movie.isInTheatres ? "Yes" : "No"}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

MovieView.propTypes = {
  handleDialogClose: PropTypes.func,
  movie: PropTypes.object,
};

export default MovieView;
