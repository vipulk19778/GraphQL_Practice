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
import UserView from "./user-view";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      message
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query GetAllUsers($searchByName: String) {
    users(name: $searchByName) {
      ... on UsersList {
        usersList {
          id
          name
          username
          age
          nationality
          friends {
            id
            name
            age
          }
          favouriteMovies {
            id
            name
            yearOfPublication
            isInTheaters
          }
        }
      }
      ... on ReturnMessage {
        message
      }
    }
  }
`;

const UsersList = () => {
  const [searchByName, setSearchByName] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [user, setUser] = useState({});

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS, {
    variables: {
      name: searchByName,
    },
  });

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const handleCreateDialogOpen = () => {
    setCreateOpen(true);
  };
  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setDataToEdit({});
  };

  const handleViewDialogOpen = (clickedUser) => {
    setUser(clickedUser);
    setViewOpen(true);
  };
  const handleViewDialogClose = () => {
    setViewOpen(false);
    setUser({});
  };

  const handleEdit = (user) => {
    handleCreateDialogOpen();
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
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleCreateDialogOpen}
      >
        Create User
      </Button>
      <Dialog open={createOpen} onClose={handleCreateDialogClose}>
        <DialogContent>
          <UserCreate
            handleDialogClose={handleCreateDialogClose}
            dataToEdit={dataToEdit}
            usersList={data?.users?.usersList}
            refetch={refetch}
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
          {data &&
          data?.users &&
          data?.users &&
          data?.users?.usersList?.length > 0
            ? data?.users?.usersList?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell
                    onClick={() => handleViewDialogOpen(user)}
                    sx={{ cursor: "pointer" }}
                  >
                    {user.id}
                  </TableCell>
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
      <Dialog open={viewOpen} onClose={handleViewDialogClose}>
        <DialogContent>
          <UserView handleDialogClose={handleViewDialogClose} user={user} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UsersList;
