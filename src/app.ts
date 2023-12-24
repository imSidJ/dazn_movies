import cors from "cors";
import express from "express";
import helmet from "helmet";
import { connect, set, disconnect } from "mongoose";
import swaggerUi from "swagger-ui-express";
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from "@config";
import { dbConnection } from "@databases";
import { Routes } from "@/interfaces/routes.interface";
import errorMiddleware from "@middlewares/error.middleware";
import swaggerDocument from "../swagger.json";
import { seedDatabase } from "./databases/seed";

class App {
	public app: express.Application;
	public env: string;
	public port: string | number;

	constructor(routes: Routes[]) {
		this.app = express();
		this.env = NODE_ENV || "development";
		this.port = PORT || 3000;

		this.connectToDatabase();
		// this.seedDatabase();
		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`🚀 App listening on the port ${this.port}`);
		});
	}

	public async closeDatabaseConnection(): Promise<void> {
		try {
			await disconnect();
			console.log("Disconnected from MongoDB");
		} catch (error) {
			console.error("Error closing database connection:", error);
		}
	}

	public getServer() {
		return this.app;
	}

	private async connectToDatabase() {
		if (this.env !== "production") {
			set("debug", true);
		}

		await connect(dbConnection.url);
	}

	private async seedDatabase() {
		if (this.env !== "test") {
			await seedDatabase();
		}
	}

	private initializeMiddlewares() {
		this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes(routes: Routes[]) {
		for (const route of routes) {
			this.app.use("/", route.router);
		}
	}

	private initializeSwagger() {
		this.app.use(
			"/api-docs",
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument),
		);
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}

export default App;
