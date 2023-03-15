import { Product } from "../entities/product";

export class ProductTransformer {
  public transform(product: any): Product {
    return {
      description: product.description,
      idCategory: product.category_id,
      name: product.name,
      price: product.price,
    };
  }
}
export const productTransformer = new ProductTransformer();