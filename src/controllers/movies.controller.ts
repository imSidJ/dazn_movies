import { NextFunction, Request, Response } from "express";
import { CreateMovieDto } from "@dtos/movies.dto";
import { Movie } from "@/interfaces/movies.interface";
import movieService from "@/services/movies.service";

class MoviesController {
  public movieService = new movieService();

  public getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllMovieData: Movie[] = await this.movieService.findAllMovies();

      res.status(200).json({ data: findAllMovieData });
    } catch (error) {
      next(error);
    }
  };

  public getMoviesByQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: string = req.query.q as string;
      console.log("query", query);
      const findMoviesData: Movie[] = await this.movieService.findMoviesByQuery(
        query
      );

      res.status(200).json({ data: findMoviesData });
    } catch (error) {
      next(error);
    }
  };

  public createMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieData: CreateMovieDto = req.body;
      const createMovieData: Movie = await this.movieService.createMovie(
        movieData
      );

      res.status(201).json({ data: createMovieData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const movieData: CreateMovieDto = req.body;
      const updateMovieData: Movie = await this.movieService.updateMovie(
        movieId,
        movieData
      );

      res.status(200).json({ data: updateMovieData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      await this.movieService.deleteMovie(movieId);

      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
