import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Close from "@mui/icons-material/Close";

const UserView = ({ handleDialogClose, user }) => {
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
          User Details
        </Typography>
        <Close onClick={handleDialogClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Card elevation={3}>
        <CardContent sx={{ py: 0 }}>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Age: {user.age}</p>
          <p>Nationality: {user.nationality}</p>

          <h3>Friends:</h3>
          <ul>
            {user?.friends?.map((friend, index) => (
              <li key={index}>
                {friend.name} ({friend.age} years old)
              </li>
            ))}
          </ul>

          <h3>Favourite Movies:</h3>
          <ul>
            {user?.favouriteMovies?.map((movie, index) => (
              <li key={index}>
                {movie.name} ({movie.yearOfPublication}) - In Theaters:{" "}
                {movie.isInTheaters ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

UserView.propTypes = {
  handleDialogClose: PropTypes.func,
  user: PropTypes.object,
};

export default UserView;
