import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    yearOfPublication: {
      type: Number,
      required: true,
    },
    isInTheaters: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
