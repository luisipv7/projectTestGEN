import ExpressAdapter from "./adapter/express-adapter";
import PgAdapter from "./adapter/postgres-adapter";
import CategoryController from "./controller/category-controller";
import CategoryRespository from "./repository/category-respository";
require("dotenv").config();

const { PORT } = process.env;

const connection = new PgAdapter();
const httpServer = new ExpressAdapter();
const categoryRespository = new CategoryRespository(connection);
new CategoryController(httpServer, categoryRespository);
httpServer.listen(Number(PORT));
httpServer.swagger();
