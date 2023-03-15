import { Product } from "../entities/product";
import HttpServer from "../interface/http-server";
import {ICalculatePercent, IProduct} from "../interface/interfaces";
import CategoryRespository from "../repository/category-respository";
import ProductRespository from "../repository/product-respository";
import CalculatePercent from "../services/calculate-percent-service";
import { productTransformer } from "../transformer/product";
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
  PRODUCT_CALCULATE,
  UPDATE_CATEGORY_SUCCESS,
} from "../validator/errors/http-codes";
import { ResponseCreator } from "../validator/errors/response";
import { validate } from "../validator/errors/validate";
import { calculatePercentSchema, createProductSchema, deleteProductSchema, findProductSchema, updateProductSchema } from "../validator/products/product-schema";

const { success, error } = ResponseCreator;

export default class ProductController {
  constructor(
    readonly httpServer: HttpServer,
    readonly productRespository: ProductRespository,
    readonly calculatePercent: CalculatePercent
  ) {
    httpServer.register(
      "get",
      "/v1/products/:idProduct",
      async function (params: IProduct, body?: any) {
        try {
          validate(params, findProductSchema);
          const res = await productRespository.findProduct(params);
          const product = productTransformer.transform(res);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace("%idProduct%", `${params.idProduct}`),
              []
            );
          }
          return success(OK, CATEGORY_FOUND_SUCCESS, product);
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "post",
      "/v1/products",
      async function (params: any, body: Product) {
        try {
          validate(body, createProductSchema);
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
      "/v1/products/:idProduct",
      async function (params: IProduct, body: Product) {
        try {
          validate(body, updateProductSchema);
          const res = await productRespository.findProduct(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace(
                "%idCategory%",
                `${params.idProduct}`
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
      "/v1/products/:idCategory",
      async function (params: IProduct, body?: Product) {
        try {
          validate(params, deleteProductSchema);
          const res = await productRespository.findProduct(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace(
                "%idCategory%",
                `${params.idProduct}`
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

    httpServer.register(
      "get",
      "/v1/products/:idProduct/installments/:nrInstallments",
      async function (params: ICalculatePercent, body?: any) {
        try {
          validate(params, calculatePercentSchema);
          const res = await productRespository.findProduct(params);
          const product = productTransformer.transform(res);
          if (!product) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace("%idProduct%", `${params.idProduct}`),
              []
            );
          }
          const response = await calculatePercent.execute(product, params.nrInstallments, params.idProduct);
          return success(OK, PRODUCT_CALCULATE, { numero_de_parcelas: params.nrInstallments, valor_cada_parcela: response });
        } catch (error) {
          return error;
        }
      }
    );
  }
}
