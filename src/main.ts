import ExpressAdapter from "./adapter/express-adapter";
import PgAdapter from "./adapter/postgres-adapter";
import CategoryController from "./controller/category-controller";
import ProductController from "./controller/product-controller";
import CategoryRespository from "./repository/category-respository";
import ProductRespository from "./repository/product-respository";
require("dotenv").config();

const { PORT } = process.env;

const connection = new PgAdapter();
const httpServer = new ExpressAdapter();
const categoryRespository = new CategoryRespository(connection);
const productRespository = new ProductRespository(connection);
new CategoryController(httpServer, categoryRespository);
new ProductController(httpServer, productRespository);
httpServer.listen(Number(PORT));
httpServer.swagger();
