import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import UserCreate from "./user-create";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      ... on UpdateSuccess {
        message
      }

      ... on UpdateError {
        message
      }
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query GetAllUsers($searchByName: String) {
    users(name: $searchByName) {
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
  }
`;

const UsersList = () => {
  const [searchByName, setSearchByName] = useState("");
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS, {
    variables: {
      name: searchByName,
    },
  });

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleEdit = (user) => {
    handleDialogOpen();
    if (user) {
      setDataToEdit(user);
    }
  };

  const handleDelete = (user) => {
    deleteUser({
      variables: {
        deleteUserId: user.id,
      },
    });
    refetch();
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchByName(inputValue);
  };

  const fetchSearchedUser = () => {
    refetch({ searchByName });
  };

  return loading ? (
    "Users Loading..."
  ) : error ? (
    "Users Error"
  ) : (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleDialogOpen}>
        Create User
      </Button>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogContent>
          <UserCreate
            handleDialogClose={handleDialogClose}
            refetch={refetch}
            dataToEdit={dataToEdit}
          />
        </DialogContent>
      </Dialog>
      <Stack direction="row" sx={{ gap: 1 }}>
        <TextField
          type="text"
          size="small"
          placeholder="Search By Name..."
          name="search"
          value={searchByName}
          onChange={handleSearch}
        />
        <Button variant="contained" size="small" onClick={fetchSearchedUser}>
          Fetch
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.users && data?.users?.length > 0
            ? data?.users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.nationality}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Edit
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleEdit(user)}
                    />
                    <Delete
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDelete(user)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : searchByName && <p>No user found.</p>}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UsersList;
