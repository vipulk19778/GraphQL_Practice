import { MovieList, UserList } from "../fakeData.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";

const resolvers = {
  UsersListResponse: {
    __resolveType(obj) {
      if (obj.usersList) {
        return "UsersList";
      }
      if (obj.message) {
        return "ReturnMessage";
      }
      return null;
    },
  },
  UserResponse: {
    __resolveType(obj) {
      if (obj.id) {
        return "User";
      }
      if (obj.message) {
        return "ReturnMessage";
      }
      return null;
    },
  },
  MoviesListResponse: {
    __resolveType(obj) {
      if (obj.moviesList) {
        return "MoviesList";
      }
      if (obj.message) {
        return "ReturnMessage";
      }
      return null;
    },
  },
  MovieResponse: {
    __resolveType(obj) {
      if (obj.id) {
        return "Movie";
      }
      if (obj.message) {
        return "ReturnMessage";
      }
      return null;
    },
  },

  Query: {
    users: async (parent, args) => {
      try {
        let users;
        if (args.name) {
          const searchName = args.name.toLowerCase();
          users = await User.find({
            name: { $regex: searchName, $options: "i" },
          }).populate("friends favouriteMovies");
        } else {
          users = await User.find({}).populate("friends favouriteMovies");
        }

        if (users.length > 0) {
          return { usersList: users };
        } else {
          return { message: "No users found." };
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        return { message: "Failed to fetch users." };
      }
    },
    user: async (parent, args) => {
      try {
        const user = await User.findById(args.id).populate(
          "friends favouriteMovies"
        );
        if (user) {
          return user;
        } else {
          return { message: "User not found." };
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        return { message: "Failed to fetch user." };
      }
    },
    movies: async (parent, args) => {
      try {
        let movies;
        if (args.name) {
          const searchName = args.name.toLowerCase();
          movies = await Movie.find({
            name: { $regex: searchName, $options: "i" },
          });
        } else {
          movies = await Movie.find({});
        }

        if (movies.length > 0) {
          return { moviesList: movies };
        } else {
          return { message: "No movies found." };
        }
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        return { message: "Failed to fetch movies." };
      }
    },
    movie: async (parent, args) => {
      try {
        const movie = await Movie.findById(args.id);
        if (movie) {
          return movie;
        } else {
          return { message: "Movie not found." };
        }
      } catch (error) {
        console.error("Error fetching movie:", error.message);
        return { message: "Failed to fetch movie." };
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const userInput = args.input;

        const user = new User(userInput);
        await user.save(); // Save the new user to the database

        // Return success message
        return { message: "User created successfully" };
      } catch (error) {
        console.error("Error creating user:", error.message);

        // Return error message
        return { message: "Failed to create user" };
      }
    },

    updateUser: async (parent, args) => {
      try {
        const userInput = args.input;
        const user = await User.findByIdAndUpdate(userInput.id, userInput, {
          new: true, // Return the updated document
        });

        // If the user wasn't found, return failure message
        if (!user) {
          return { message: "User not found" };
        }

        // If the user was successfully updated, return success message
        return { message: "User updated successfully" };
      } catch (error) {
        console.error("Error updating user:", error.message);

        // Return error message
        return { message: "Failed to update user" };
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const id = args.id;
        const deletedUser = await User.findByIdAndDelete(id);

        // If the user wasn't found, return failure message
        if (!deletedUser) {
          return { message: "User not found" };
        }

        // If the user was successfully deleted, return success message
        return { message: "User deleted successfully" };
      } catch (error) {
        console.error("Error deleting user:", error.message);

        // Return error message
        return { message: "Failed to delete user" };
      }
    },
  },
};

export default resolvers;
