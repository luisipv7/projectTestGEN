import { createCategorySchema } from "../validator/categories/create-category-schema";
import { validate } from "../validator/errors/validate";

export class Category {
  public readonly name: string;
  public readonly percentage: number;

  constructor(name: string, percentage: number) {
    this.name = name;
    this.percentage = percentage;
  }

  public static create(categoryData: Category): Category {
        const { name, percentage } = categoryData;
        return new Category(name, percentage);
    }
}
