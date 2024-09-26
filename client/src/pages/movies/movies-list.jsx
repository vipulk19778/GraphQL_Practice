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
import { useState } from "react";
import MovieCreate from "./movie-create";
import MovieView from "./movie-view";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
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

const MoviesList = () => {
  const [searchByName, setSearchByName] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [movie, setMovie] = useState({});

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_MOVIES, {
    variables: {
      name: searchByName,
    },
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);

  const handleCreateDialogOpen = () => {
    setCreateOpen(true);
  };
  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setDataToEdit({});
  };

  const handleViewDialogOpen = (clickedMovie) => {
    setMovie(clickedMovie);
    setViewOpen(true);
  };
  const handleViewDialogClose = () => {
    setViewOpen(false);
    setMovie({});
  };

  const handleEdit = (movie) => {
    handleCreateDialogOpen();
    if (movie) {
      setDataToEdit(movie);
    }
  };

  const handleDelete = (movie) => {
    deleteMovie({
      variables: {
        deleteMovieId: movie.id,
      },
    });
    refetch();
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchByName(inputValue);
  };

  const fetchSearchedMovie = () => {
    refetch({ searchByName });
  };

  return loading ? (
    "Movies Loading..."
  ) : error ? (
    "Movies Error"
  ) : (
    <Box>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleCreateDialogOpen}
      >
        Create Movie
      </Button>
      <Dialog open={createOpen} onClose={handleCreateDialogClose}>
        <DialogContent>
          <MovieCreate
            handleDialogClose={handleCreateDialogClose}
            dataToEdit={dataToEdit}
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
        <Button variant="contained" size="small" onClick={fetchSearchedMovie}>
          Fetch
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "18px" }}>Id</TableCell>
            <TableCell sx={{ fontSize: "18px" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "18px" }}>Year Of Publication</TableCell>
            <TableCell sx={{ fontSize: "18px" }}>Is In Theaters</TableCell>
            <TableCell sx={{ fontSize: "18px" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
          data?.movies &&
          data?.movies?.moviesList &&
          data?.movies?.moviesList?.length > 0
            ? data?.movies?.moviesList?.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell
                    onClick={() => handleViewDialogOpen(movie)}
                    sx={{ cursor: "pointer" }}
                  >
                    {movie.id}
                  </TableCell>
                  <TableCell>{movie.name}</TableCell>
                  <TableCell>{movie.yearOfPublication}</TableCell>
                  <TableCell>{movie.isInTheaters ? "Yes" : "No"}</TableCell>
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
                      onClick={() => handleEdit(movie)}
                    />
                    <Delete
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDelete(movie)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : searchByName && <p>No movie found.</p>}
        </TableBody>
      </Table>
      <Dialog open={viewOpen} onClose={handleViewDialogClose}>
        <DialogContent>
          <MovieView handleDialogClose={handleViewDialogClose} movie={movie} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MoviesList;
