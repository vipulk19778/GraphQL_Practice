import gql from "graphql-tag";

const typeDefs = gql`
  type ReturnMessage {
    message: String!
  }

  type UsersList {
    usersList: [User!]!
  }
  type MoviesList {
    moviesList: [Movie!]!
  }

  union UsersListResponse = UsersList | ReturnMessage
  union UserResponse = User | ReturnMessage

  union MoviesListResponse = MoviesList | ReturnMessage
  union MovieResponse = Movie | ReturnMessage

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users(name: String): UsersListResponse!
    user(id: ID!): UserResponse!
    movies(name: String): MoviesListResponse!
    movie(id: ID!): MovieResponse!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
    friends: [ID]
    favouriteMovies: [ID]
  }
  input UpdateUserInput {
    id: ID!
    name: String
    username: String
    age: Int
    nationality: Nationality
    friends: [ID]
    favouriteMovies: [ID]
  }

  input CreateMovieInput {
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }
  input UpdateMovieInput {
    id: ID!
    name: String
    yearOfPublication: Int
    isInTheaters: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): ReturnMessage!

    updateUser(input: UpdateUserInput!): ReturnMessage!

    deleteUser(id: ID!): ReturnMessage!

    createMovie(input: CreateMovieInput!): ReturnMessage!

    updateMovie(input: UpdateMovieInput!): ReturnMessage!

    deleteMovie(id: ID!): ReturnMessage!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }
`;

export default typeDefs;
