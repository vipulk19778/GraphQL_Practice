import { gql, useMutation } from "@apollo/client";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($formData: CreateUserInput!) {
    createUser(input: $formData) {
      id
      name
      username
      age
      nationality
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($formData: UpdateUserInput!) {
    updateUser(input: $formData) {
      ... on User {
        id
        name
        username
        age
        nationality
      }
      ... on UpdateError {
        message
      }
    }
  }
`;

const UserCreate = ({ handleDialogClose, refetch, dataToEdit }) => {
  const [formData, setFormData] = useState(
    dataToEdit.id
      ? {
          name: dataToEdit.name,
          username: dataToEdit.username,
          age: Number(dataToEdit.age),
          nationality: dataToEdit.nationality,
        }
      : {
          name: "",
          username: "",
          age: 20,
          nationality: "INDIA",
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
          },
        },
      });
    } else {
      createUser({
        variables: {
          formData: { ...formData, age: Number(formData?.age) },
        },
      });
    }
    handleDialogClose();
    refetch();
  };
  return (
    <>
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
  refetch: PropTypes.func,
};

export default UserCreate;
