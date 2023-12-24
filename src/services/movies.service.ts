import { isEmpty } from "@/utils/util";
import { HttpException } from "@exceptions/HttpException";
import { Movie } from "@/interfaces/movies.interface";
import { CreateMovieDto, UpdateMovieDto } from "@dtos/movies.dto";
import movieModel from "@models/movies.models";

class MovieService {
  public movies = movieModel;

  public async findAllMovies(): Promise<Movie[]> {
    const movies: Movie[] = await this.movies.find().select({ __v: 0 }).lean();
    return movies;
  }

  public async findMoviesByQuery(query: string): Promise<Movie[]> {
    if (isEmpty(query)) throw new HttpException(400, "Query is empty");

    const findMovies: Movie[] = await this.movies
      .find({
        $or: [{ title: { $regex: query } }, { genres: query }],
      })
      .select({ __v: 0 })
      .lean();
    if (!findMovies) throw new HttpException(409, "Movie doesn't exist");

    return findMovies;
  }

  public async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "movieData is empty");

    const createMovieData: Movie = await this.movies.create({ ...movieData });

    return createMovieData;
  }

  public async updateMovie(
    movieId: string,
    movieData: UpdateMovieDto
  ): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "movieData is empty");

    const updateMovieById: Movie = await this.movies.findOneAndUpdate(
      { _id: movieId },
      { movieData }
    );

    if (!updateMovieById) throw new HttpException(409, "Movie doesn't exist");

    return updateMovieById;
  }

  public async deleteMovie(movieId: string): Promise<void> {
    const deleteMovieById = await this.movies.deleteOne({ _id: movieId });
    if (!deleteMovieById) throw new HttpException(409, "Movie doesn't exist");

    return;
  }
}

export default MovieService;
