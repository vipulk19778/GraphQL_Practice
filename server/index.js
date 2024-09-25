import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import mongoose from "mongoose";
import { MONGO_URI } from "./utils/config.js";

const startServer = async () => {
  const app = express();
  const PORT = 8000;

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("connect to mongodb");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error connecting to mongodb", err);
  });

  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`));
};

startServer();
