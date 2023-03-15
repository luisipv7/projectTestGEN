import { Category } from "../entities/category";

export interface ICategory {
    idCategory: number
}

export interface IProduct {
  idProduct: number;
}

export interface ICalculatePercent {
  idProduct: number;
  nrInstallments: number;
}

export interface ICategoryRespository {
  createCategory?(body: Category): Promise<any>;
  findCategory(idCategory: ICategory): Promise<any>;
  updateCategory?(params: ICategory, body: Category): Promise<any>;
  deleteCategory?(params: ICategory): Promise<any>;
}