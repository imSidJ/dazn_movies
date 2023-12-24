import App from "@/app";
import IndexRoute from "@/routes/index.route";
import MoviesRoute from "@routes/movies.route";
import validateEnv from "@utils/validateEnv";

validateEnv();

const app = new App([new IndexRoute(), new MoviesRoute()]);

app.listen();
