import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      enum: ["CANADA", "BRAZIL", "INDIA", "GERMANY", "CHILE"],
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    favouriteMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
