import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies($searchByName: String) {
    movies(name: $searchByName) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const MoviesList = () => {
  const [searchByName, setSearchByName] = useState("");

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_MOVIES, {
    variables: {
      name: searchByName,
    },
  });

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.movies && data?.movies?.length > 0
            ? data?.movies?.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.name}</TableCell>
                  <TableCell>{movie.yearOfPublication}</TableCell>
                  <TableCell>{movie.isInTheaters ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))
            : searchByName && <p>No movie found.</p>}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MoviesList;
