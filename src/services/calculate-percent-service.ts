import { Product } from "../entities/product";
import { ICategory, ICategoryRespository} from "../interface/interfaces";
import CategoryRespository from "../repository/category-respository";

export default class CalculatePercent {
  constructor(
    readonly categoryRespository: ICategoryRespository
  ) {}

  async execute(product: Product, nrInstallments: number, idProduct: number): Promise<Number> {
    const category: ICategory = { idCategory:  product.idCategory}
    const { percentage } = await this.categoryRespository.findCategory(category)
    const percentageCalculate = percentage/100
    const priceInstallments = product.price * percentageCalculate / (1 - Math.pow(1 + percentageCalculate, - nrInstallments));
    return priceInstallments
  }
}