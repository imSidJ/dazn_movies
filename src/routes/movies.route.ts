import { Router } from "express";
import MoviesController from "@controllers/movies.controller";
import { CreateMovieDto, UpdateMovieDto } from "@dtos/movies.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authorizationMiddleware from "@/middlewares/authorization.middleware";

class MoviesRoute implements Routes {
  public path = "/movies";
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moviesController.getMovies);
    this.router.get("/search", this.moviesController.getMoviesByQuery);
    this.router.post(
      `${this.path}`,
      authorizationMiddleware("Admin"),
      validationMiddleware(CreateMovieDto, "body"),
      this.moviesController.createMovie
    );
    this.router.put(
      `${this.path}/:id`,
      authorizationMiddleware("Admin"),
      validationMiddleware(UpdateMovieDto, "body", true),
      this.moviesController.updateMovie
    );
    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware("Admin"),
      this.moviesController.deleteMovie
    );
  }
}

export default MoviesRoute;
