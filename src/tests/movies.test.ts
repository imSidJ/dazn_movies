import mongoose from "mongoose";
import request from "supertest";
import App from "@/app";
import { CreateMovieDto, UpdateMovieDto } from "@dtos/movies.dto";
import MoviesRoute from "@routes/movies.route";

beforeAll(async () => {
	jest.setTimeout(10000);
});
afterAll(async () => {
	await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Movies", () => {
	describe("[GET] /movies", () => {
		it("findAll Movies", async () => {
			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.find = jest.fn().mockReturnValue([
				{
					id: 1,
					title: "Beetlejuice",
					genres: ["Comedy", "Fantasy"],
					rating: 10,
					streamingLinks: ["netflix.com"],
				},
				{
					id: 2,
					title: "The Cotton Club",
					genres: ["Crime", "Drama", "Music"],
					rating: 10,
					streamingLinks: ["netflix.com"],
				},
				{
					id: 3,
					title: "The Shawshank Redemption",
					genres: ["Crime", "Drama"],
					rating: 10,
					streamingLinks: ["netflix.com"],
				},
			]);

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);

			return request(app.getServer()).get(`${moviesRoute.path}`).expect(200);
		});
	});

	describe("[GET] /search", () => {
		it("find movie by title or genre", async () => {
			const q = "Beetlejuice";

			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.find = jest.fn().mockReturnValue([
				{
					id: 1,
					title: "Beetlejuice",
					genres: ["Comedy", "Fantasy"],
					rating: 10,
					streamingLinks: ["netflix.com"],
				},
			]);

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);
			return request(app.getServer()).get(`/search/?q=${q}`).expect(200);
		});
	});

	describe("[POST] /movies", () => {
		it("Error not Admin", async () => {
			const movieData: CreateMovieDto = {
				title: "Beetlejuice",
				genres: ["Comedy", "Fantasy"],
				rating: 5,
				streamingLinks: ["netflix.com"],
			};

			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.create = jest.fn().mockReturnValue({
				_id: "60706478aad6c9ad19a31c84",
				title: "Beetlejuice",
				genres: ["Comedy", "Fantasy"],
				rating: 5,
				streamingLinks: ["netflix.com"],
			});

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);
			return request(app.getServer())
				.post(`${moviesRoute.path}`)
				.set("Content-Type", "application/json")
				.send(movieData)
				.expect(401);
		});

		it("Add Movie", async () => {
			const movieData: CreateMovieDto = {
				title: "Beetlejuice",
				genres: ["Comedy", "Fantasy"],
				rating: 5,
				streamingLinks: ["netflix.com"],
			};

			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.create = jest.fn().mockReturnValue({
				_id: "60706478aad6c9ad19a31c84",
				title: "Beetlejuice",
				genres: ["Comedy", "Fantasy"],
				rating: 5,
				streamingLinks: ["netflix.com"],
			});

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);
			return request(app.getServer())
				.post(`${moviesRoute.path}`)
				.set(
					"Authorization",
					"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MDI4Mjk1NTksImV4cCI6MTczNDM2NTU1OSwiYXVkIjoiIiwic3ViIjoiIiwicm9sZSI6IkFkbWluIn0.fD2s37pPRLWgz6x3nG-780x8CC1Gxsw-OG-6aSYNuRI",
				)
				.set("Content-Type", "application/json")
				.send(movieData)
				.expect(201);
		});
	});

	describe("[PUT] /movies/:id", () => {
		it("Update Movie", async () => {
			const movieId = "60706478aad6c9ad19a31c84";
			const movieData: UpdateMovieDto = {
				rating: 8,
				streamingLinks: ["netflix.com", "hotstar.com"],
			};

			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.findByIdAndUpdate = jest.fn().mockReturnValue({
				_id: movieId,
				title: "Beetlejuice",
				genres: ["Comedy", "Fantasy"],
				rating: 8,
				streamingLinks: ["netflix.com", "hotstar.com"],
			});

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);
			return request(app.getServer())
				.put(`${moviesRoute.path}/${movieId}`)
				.set(
					"Authorization",
					"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MDI4Mjk1NTksImV4cCI6MTczNDM2NTU1OSwiYXVkIjoiIiwic3ViIjoiIiwicm9sZSI6IkFkbWluIn0.fD2s37pPRLWgz6x3nG-780x8CC1Gxsw-OG-6aSYNuRI",
				)
				.set("content-type", "application/json")
				.send(movieData)
				.expect(200);
		});
	});

	describe("[DELETE] /users/:id", () => {
		it("response Delete User", async () => {
			const movieId = "60706478aad6c9ad19a31c84";

			const moviesRoute = new MoviesRoute();
			const movies = moviesRoute.moviesController.movieService.movies;

			movies.findByIdAndDelete = jest
				.fn()
				.mockReturnValue({ acknowledged: true, deletedCount: 1 });

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(mongoose as any).connect = jest.fn();
			const app = new App([moviesRoute]);
			return request(app.getServer())
				.delete(`${moviesRoute.path}/${movieId}`)
				.set(
					"Authorization",
					"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MDI4Mjk1NTksImV4cCI6MTczNDM2NTU1OSwiYXVkIjoiIiwic3ViIjoiIiwicm9sZSI6IkFkbWluIn0.fD2s37pPRLWgz6x3nG-780x8CC1Gxsw-OG-6aSYNuRI",
				)
				.expect(200);
		});
	});
});
