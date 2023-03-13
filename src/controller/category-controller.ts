import {
  StatusCodes,
} from "http-status-codes";
import { Category } from "../entities/category";
import HttpServer from "../interface/http-server";
import ICategory from "../interface/interfaces";
import CategoryRespository from "../repository/category-respository";
import { createCategorySchema } from "../validator/categories/create-category-schema";
import { findcategorySchema } from "../validator/categories/find-category-schema";
import { validate } from "../validator/errors/validate";
import { response } from "../interface/response";

export default class CategoryController {
  constructor(
    readonly httpServer: HttpServer,
    readonly categoryRespository: CategoryRespository
  ) {
    httpServer.register(
      "get",
      "/v1/products/:idCategory/categories",
      async function (params: ICategory, body?: any) {
        try {
          validate(params, findcategorySchema);
          const res = await categoryRespository.findCategory(params);
          return {
            res,
          };
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "post",
      "/v1/category",
      async function (params: any, body: Category) {
        try {
          validate(body, createCategorySchema);
          const user = Category.create(body);
          const res = await categoryRespository.createCategory(user);
          if (!res) {
            throw {
              status: StatusCodes.CONFLICT,
              msg: 'Já existe esta categoria!'}
          }
          return {
            status: StatusCodes.CREATED,
            data: user
          } as response;
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "patch",
      "/v1/category/:idCategory",
      async function (params: ICategory, body: Category) {
        try {
          validate(body, createCategorySchema);
          const user = Category.create(body);
          const res = await categoryRespository.updateCategory(params, user);
          if (!res) {
            throw {
              status: StatusCodes.BAD_REQUEST,
              msg: `Não foi possivel encontrar a categoria com o id ${params.idCategory}!`,
            };
          }
          return {
            status: StatusCodes.ACCEPTED,
            msg: 'Atualizado com sucesso!'
          } as response
        } catch (error) {
          return error;
        }
      }
    );
  }
}
