import gql from "graphql-tag";

const typeDefs = gql`
  type UpdateSuccess {
    message: String!
  }
  type UpdateError {
    message: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users(name: String): [User!]!
    user(id: ID!): UserResponse!
    movies(name: String): [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
  }
  input UpdateUserInput {
    id: ID!
    name: String
    username: String
    age: Int
    nationality: Nationality
  }

  type Mutation {
    createUser(input: CreateUserInput!): User

    updateUser(input: UpdateUserInput!): UpdateUserResponse!

    deleteUser(id: ID!): DeleteUserResponse!
  }

  union UserResponse = User | UpdateError

  union UpdateUserResponse = User | UpdateError

  union DeleteUserResponse = UpdateSuccess | UpdateError

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }
`;

export default typeDefs;
