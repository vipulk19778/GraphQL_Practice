import { MovieList, UserList } from "../fakeData.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";

const resolvers = {
  Query: {
    users: async (parent, args) => {
      if (args.name) {
        const searchName = args.name.toLowerCase();
        return UserList.filter((user) =>
          user.name.toLowerCase().includes(searchName)
        );
      }
      return await User.find();
    },
    user: (parent, args) => {
      const id = Number(args.id);
      const user = UserList.find((user) => Number(user.id) === id);
      if (user) return user;
      return { message: "User not found." };
    },
    movies: (parent, args) => {
      if (args.name) {
        const searchName = args.name.toLowerCase();
        return MovieList.filter((movie) =>
          movie.name.toLowerCase().includes(searchName)
        );
      }
      return MovieList;
    },
    movie: (parent, args) => {
      const movieName = args.name;
      return MovieList.find((movie) => movie.name === movieName);
    },
  },
  User: {
    favoriteMovies: () => {
      return MovieList.filter(
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  UserResponse: {
    __resolveType(obj) {
      if (obj.id) {
        return "User";
      }
      if (obj.message) {
        return "UpdateError";
      }
      return null;
    },
  },

  UpdateUserResponse: {
    __resolveType(obj) {
      if (obj.message) {
        return "UpdateError";
      }
      return "User";
    },
  },

  DeleteUserResponse: {
    __resolveType(obj) {
      if (obj.message === "User deleted successfully") {
        return "UpdateSuccess";
      }

      if (obj.message === "User not found") {
        return "UpdateError";
      }

      return null;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const userInput = args.input;
      console.log(userInput, "user successfully added");

      // const lastId = UserList[UserList.length - 1].id;
      // user.id = lastId + 1;
      // UserList.push(user);
      const user = new User(userInput);
      return await user.save();
    },
    updateUser: (parent, args) => {
      const inputUser = args.input;

      let updatedUser = null;
      UserList.forEach((user, index) => {
        if (Number(user.id) === Number(inputUser.id)) {
          UserList[index] = { ...user, ...inputUser };
          updatedUser = UserList[index];
          console.log("user updated", UserList[index]);
        }
      });

      if (!updatedUser) {
        return { message: "Update Failed" };
      }
      return updatedUser;
    },
    deleteUser: (parent, args) => {
      const id = Number(args.id);
      const userIndex = UserList?.findIndex((user) => Number(user.id) === id);

      if (userIndex > -1) {
        UserList.splice(userIndex, 1);
        UserList.forEach((user, index) => {
          if (index >= userIndex) {
            user.id--;
          }
        });
        return { message: "User deleted successfully" };
      } else {
        return { message: "User not found" };
      }
    },
  },
};

export default resolvers;
