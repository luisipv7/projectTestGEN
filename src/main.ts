import ExpressAdapter from "./adapter/express-adapter";
import PgAdapter from "./adapter/postgres-adapter";
import CategoryController from "./controller/category-controller";
import ProductController from "./controller/product-controller";
import CategoryRespository from "./repository/category-respository";
import ProductRespository from "./repository/product-respository";
import CalculatePercent from "./services/calculate-percent-service";
require("dotenv").config();

const { PORT } = process.env;

const connection = new PgAdapter();
const httpServer = new ExpressAdapter();
const categoryRespository = new CategoryRespository(connection);
const productRespository = new ProductRespository(connection);
const serviceCalculatePercent = new CalculatePercent(categoryRespository);
new CategoryController(httpServer, categoryRespository);
new ProductController(httpServer, productRespository, serviceCalculatePercent);
httpServer.listen(Number(PORT));
httpServer.swagger();
