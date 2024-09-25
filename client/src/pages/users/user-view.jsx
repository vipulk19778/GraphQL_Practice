import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import Close from "@mui/icons-material/Close";

const QUERY_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ... on User {
        id
        name
        username
        age
        nationality
        friends {
          name
          age
        }
        favoriteMovies {
          id
          name
          yearOfPublication
          isInTheaters
        }
      }
      ... on ReturnMessage {
        message
      }
    }
  }
`;

const UserView = ({ handleDialogClose, userId }) => {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      userId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.user) {
    return <p>User not found.</p>;
  }

  const { user } = data;

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
            {user.friends.map((friend, index) => (
              <li key={index}>
                {friend.name} ({friend.age} years old)
              </li>
            ))}
          </ul>

          <h3>Favorite Movies:</h3>
          <ul>
            {user.favoriteMovies.map((movie, index) => (
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
  userId: PropTypes.string,
};

export default UserView;
