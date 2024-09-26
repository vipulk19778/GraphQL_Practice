import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import Close from "@mui/icons-material/Close";

const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie($formData: CreateMovieInput!) {
    createMovie(input: $formData) {
      message
    }
  }
`;
const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovie($formData: UpdateMovieInput!) {
    updateMovie(input: $formData) {
      message
    }
  }
`;

const MovieCreate = ({ handleDialogClose, dataToEdit, refetch }) => {
  const [formData, setFormData] = useState(
    dataToEdit?.id
      ? {
          id: dataToEdit.id,
          name: dataToEdit.name,
          yearOfPublication: Number(dataToEdit?.yearOfPublication),
          isInTheaters: dataToEdit?.isInTheaters,
        }
      : {
          name: "",
          yearOfPublication: 0,
          isInTheaters: true,
        }
  );

  const [createMovie] = useMutation(CREATE_MOVIE_MUTATION);

  const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    handleDialogClose();
  };

  const handleSave = () => {
    if (dataToEdit?.id) {
      updateMovie({
        variables: {
          formData: {
            ...formData,
            yearOfPublication: Number(formData?.yearOfPublication),
          },
        },
      });
    } else {
      createMovie({
        variables: {
          formData: {
            ...formData,
            yearOfPublication: Number(formData?.yearOfPublication),
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
          {dataToEdit?.id ? "Edit Movie" : "Create Movie"}
        </Typography>
        <Close onClick={handleDialogClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          type="text"
          size="small"
          placeholder="XYZ..."
          label="Name"
          name="name"
          value={formData?.name}
          onChange={handleFormData}
        />
        <TextField
          type="number"
          size="small"
          placeholder="1960..."
          label="Year Of Publication"
          name="yearOfPublication"
          value={formData?.yearOfPublication}
          onChange={handleFormData}
        />

        <FormControl fullWidth>
          <InputLabel id="isInTheaters">Is In Theatres</InputLabel>
          <Select
            size="small"
            label="Is In Theatres"
            id="isInTheaters"
            name="isInTheaters"
            value={formData?.isInTheaters}
            onChange={handleFormData}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
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

MovieCreate.propTypes = {
  dataToEdit: PropTypes.object,
  handleDialogClose: PropTypes.func,
  usersList: PropTypes.array,
  refetch: PropTypes.func,
};

export default MovieCreate;
