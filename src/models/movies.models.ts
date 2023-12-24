import { model, Schema, Document } from "mongoose";
import { Movie } from "@/interfaces/movies.interface";

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  genres: { type: [String], required: true },
  rating: { type: Number },
  streamingLinks: { type: [String] },
});

const movieModel = model<Movie & Document>("Movie", movieSchema);

export default movieModel;
