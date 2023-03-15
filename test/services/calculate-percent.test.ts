import { Category } from "../../src/entities/category";
import { Product } from "../../src/entities/product";
import { ICategory, ICategoryRespository } from "../../src/interface/interfaces";
import CategoryRespository from "../../src/repository/category-respository";
import CalculatePercentService from "../../src/services/calculate-percent-service";
const responseCategoryRepository =
  require("./mocks/response-repository-category.json") as Category;
const product = require('./mocks/product.json') as Product
test('Deve calcular a porcentagem', async () => {
    const categoryRespository: ICategoryRespository ={
        async findCategory(idCategory) {
            return Promise.resolve(responseCategoryRepository);
        },
    }
    const calculatePercentService = new CalculatePercentService(
      categoryRespository
    );
    const output = await calculatePercentService.execute(product,5,1);
    expect(output).toBe(6.929243943848038);
});