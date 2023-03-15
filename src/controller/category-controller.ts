
import { Category } from "../entities/category";
import HttpServer from "../interface/http-server";
import {ICategory} from "../interface/interfaces";
import CategoryRespository from "../repository/category-respository";
import { createCategorySchema, deletecategorySchema, findcategorySchema, updateCategorySchema } from "../validator/categories/category-schema";
import { ACCEPTED, CATEGORY_FOUND_SUCCESS, CATEGORY_NOT_FOUND, CONFLICT, CREATED, CREATE_CATEGORY_ERROR, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, NOT_FOUND, OK, UPDATE_CATEGORY_SUCCESS } from "../validator/errors/http-codes";
import { ResponseCreator } from "../validator/errors/response";
import { validate } from "../validator/errors/validate";

const { success, error } = ResponseCreator;

export default class CategoryController {
  constructor(
    readonly httpServer: HttpServer,
    readonly categoryRespository: CategoryRespository
  ) {
    httpServer.register(
      "get",
      "/v1/categories/:idCategory",
      async function (params: ICategory, body?: any) {
        try {
          validate(params, findcategorySchema);
          const res = await categoryRespository.findCategory(params);
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
          return success(OK, CATEGORY_FOUND_SUCCESS, res);
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
            throw error(CONFLICT, CREATE_CATEGORY_ERROR, [])
          }
          return success(CREATED, CREATE_CATEGORY_SUCCESS, user);
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
          validate(body, updateCategorySchema);
          const res = await categoryRespository.findCategory(params);
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
          const user = Category.create(body);
          await categoryRespository.updateCategory(params, user);
          return success(ACCEPTED, UPDATE_CATEGORY_SUCCESS, null);
        } catch (error) {
          return error;
        }
      }
    );

    httpServer.register(
      "delete",
      "/v1/category/:idCategory",
      async function (params: ICategory, body?: Category) {
        try {
          validate(params, deletecategorySchema);
          const res = await categoryRespository.findCategory(params);
          if (!res) {
            throw error(
              NOT_FOUND,
              CATEGORY_NOT_FOUND.replace("%idCategory%", `${params.idCategory}`),
              []
            )
          }
          await categoryRespository.deleteCategory(params);
          return success(OK, DELETE_CATEGORY_SUCCESS, null);
        } catch (error) {
          return error;
        }
      }
    );
  }
}
