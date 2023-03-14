import { Product } from "../entities/product";
import HttpServer from "../interface/http-server";
import IProduct from "../interface/interfaces";
import CategoryRespository from "../repository/category-respository";
import ProductRespository from "../repository/product-respository";
import {
  createCategorySchema,
  deletecategorySchema,
  findcategorySchema,
  updateCategorySchema,
} from "../validator/categories/category-schema";
import {
  ACCEPTED,
  CATEGORY_FOUND_SUCCESS,
  CATEGORY_NOT_FOUND,
  CONFLICT,
  CREATED,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  NOT_FOUND,
  OK,
  UPDATE_CATEGORY_SUCCESS,
} from "../validator/errors/error-codes";
import { ResponseCreator } from "../validator/errors/response";
import { validate } from "../validator/errors/validate";

const { success, error } = ResponseCreator;

export default class ProductController {
  constructor(
    readonly httpServer: HttpServer,
    readonly productRespository: ProductRespository
  ) {
    httpServer.register(
      "get",
      "/v1/products/:idProduct",
      async function (params: IProduct, body?: any) {
        try {
          validate(params, findcategorySchema);
          const res = await productRespository.findProduct(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace("%idProduct%", `${params.idProduct}`),
              []
            );
          }
          return success(OK, CATEGORY_FOUND_SUCCESS, res);
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "post",
      "/v1/category",
      async function (params: any, body: Product) {
        try {
          validate(body, createCategorySchema);
          const product = Product.create(body);
          const res = await productRespository.createProduct(product);
          if (!res) {
            throw error(CONFLICT, CREATE_CATEGORY_ERROR, []);
          }
          return success(CREATED, CREATE_CATEGORY_SUCCESS, product);
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "patch",
      "/v1/category/:idCategory",
      async function (params: IProduct, body: Product) {
        try {
          validate(body, updateCategorySchema);
          const res = await productRespository.findProduct(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace(
                "%idCategory%",
                `${params.idCategory}`
              ),
              []
            );
          }
          const product = Product.create(body);
          await productRespository.updateProduct(params, product);
          return success(ACCEPTED, UPDATE_CATEGORY_SUCCESS, null);
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "delete",
      "/v1/category/:idCategory",
      async function (params: IProduct, body?: Product) {
        try {
          validate(params, deletecategorySchema);
          const res = await productRespository.findProduct(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace(
                "%idCategory%",
                `${params.idCategory}`
              ),
              []
            );
          }
          await productRespository.deleteProduct(params);
          return success(OK, DELETE_CATEGORY_SUCCESS, null);
        } catch (error) {
          return error;
        }
      }
    );
  }
}
