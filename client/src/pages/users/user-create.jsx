import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import Close from "@mui/icons-material/Close";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($formData: CreateUserInput!) {
    createUser(input: $formData) {
      message
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($formData: UpdateUserInput!) {
    updateUser(input: $formData) {
      message
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies($searchByName: String) {
    movies(name: $searchByName) {
      ... on MoviesList {
        moviesList {
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

const UserCreate = ({ handleDialogClose, dataToEdit, usersList, refetch }) => {
  const { data } = useQuery(QUERY_ALL_MOVIES);
  const moviesList = data?.movies?.moviesList;

  const [formData, setFormData] = useState(
    dataToEdit.id
      ? {
          id: dataToEdit.id,
          name: dataToEdit.name,
          username: dataToEdit.username,
          age: Number(dataToEdit.age),
          nationality: dataToEdit.nationality,
          friends: dataToEdit.friends,
          favouriteMovies: dataToEdit.favouriteMovies,
        }
      : {
          name: "",
          username: "",
          age: 20,
          nationality: "",
          friends: [],
          favouriteMovies: [],
        }
  );

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleFriends = (value) => {
    setFormData((preValue) => ({ ...preValue, friends: value }));
  };

  const handleFavouriteMovies = (value) => {
    setFormData((preValue) => ({ ...preValue, favouriteMovies: value }));
  };

  const handleCancel = () => {
    handleDialogClose();
  };

  const handleSave = () => {
    if (dataToEdit.id) {
      updateUser({
        variables: {
          formData: {
            ...formData,
            age: Number(formData?.age),
            friends: formData?.friends?.map((friend) => friend?.id),
            favouriteMovies: formData?.favouriteMovies?.map(
              (movie) => movie?.id
            ),
          },
        },
      });
    } else {
      createUser({
        variables: {
          formData: {
            ...formData,
            age: Number(formData?.age),
            friends: formData?.friends?.map((friend) => friend?.id),
            favouriteMovies: formData?.favouriteMovies?.map(
              (movie) => movie?.id
            ),
          },
        },
      });
    }
    handleDialogClose();
    refetch();
  };
  return (
    <>
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
          {dataToEdit.id ? "Edit User" : "Create User"}
        </Typography>
        <Close onClick={handleDialogClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          type="text"
          size="small"
          placeholder="John Doe..."
          label="Name"
          name="name"
          value={formData?.name}
          onChange={handleFormData}
        />
        <TextField
          type="text"
          size="small"
          placeholder="john_doe@123..."
          label="User Name"
          name="username"
          value={formData?.username}
          onChange={handleFormData}
        />
        <TextField
          type="number"
          size="small"
          placeholder="20"
          label="Age"
          name="age"
          value={formData?.age}
          onChange={handleFormData}
        />
        <TextField
          type="text"
          size="small"
          placeholder="India"
          label="Nationality"
          name="nationality"
          value={formData?.nationality}
          onChange={handleFormData}
        />
        <Autocomplete
          size="small"
          multiple
          options={
            (dataToEdit?.id
              ? usersList?.filter((user) => user.id !== dataToEdit.id)
              : usersList) || []
          }
          getOptionLabel={(option) => option?.name}
          value={formData?.friends || []}
          onChange={(e, newValue) => handleFriends(newValue)}
          isOptionEqualToValue={(option, value) => option?.id === value?.id} // Prevent reselecting the same chip
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Friends"
              placeholder="John Doe..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option?.name}
                {...getTagProps({ index })}
                key={option?.id}
              />
            ))
          }
        />
        <Autocomplete
          size="small"
          multiple
          options={moviesList || []}
          getOptionLabel={(option) => option?.name || ""}
          value={formData?.favouriteMovies || []}
          onChange={(e, newValue) => handleFavouriteMovies(newValue)}
          isOptionEqualToValue={(option, value) => option?.id === value?.id} // Prevent reselecting the same chip
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Favourite Movies"
              placeholder="XYZ..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <Chip
                label={option?.name || "Unknown"}
                {...getTagProps({ index })}
                key={option?.id}
              />
            ))
          }
        />
      </Box>
      <DialogActions sx={{ mt: 2, px: 0, pb: 0 }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

UserCreate.propTypes = {
  dataToEdit: PropTypes.object,
  handleDialogClose: PropTypes.func,
  usersList: PropTypes.array,
  refetch: PropTypes.func,
};

export default UserCreate;
