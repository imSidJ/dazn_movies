import { IsArray, IsNumber, IsString, isArray } from "class-validator";

export class CreateMovieDto {
	@IsString()
	public title: string;

	@IsArray()
	public genres: string[];

	@IsNumber()
	public rating: number;

	@IsArray()
	public streamingLinks: string[];
}

export class UpdateMovieDto {
	@IsString()
	public title?: string;

	@IsArray()
	public genres?: string[];

	@IsNumber()
	public rating?: number;

	@IsArray()
	public streamingLinks?: string[];
}
