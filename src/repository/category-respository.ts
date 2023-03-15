import { Category } from "../entities/category";
import IConnection from "../interface/i-connection";
import {ICategory, ICategoryRespository} from "../interface/interfaces";

export default class CategoryRespository implements ICategoryRespository {
  constructor(readonly connection: IConnection) {}

  async createCategory(body: Category): Promise<any> {
    const ifExists = await this.connection.query(
      "SELECT * FROM category where name like $1",
      [`%${body.name}%`]
    );

    if (ifExists.rowCount) {
      return false;
    }

    const response = await this.connection.query(
      "INSERT INTO category (name, percentage ) VALUES ($1, $2)",
      [body.name, body.percentage]
    );
    return response;
  }

  async findCategory(idCategory: ICategory): Promise<Category> {
    const response = await this.connection.query(
      "SELECT * FROM category WHERE category_id = $1",
      [+idCategory.idCategory]
    );
    await this.connection.close();
    return response.rows[0];
  }

  async updateCategory(params: ICategory, body: Category): Promise<any> {
    const categoryFind = await this.findCategory(params);
    if (!categoryFind) {
      return false;
    }
    const category: Category = {
      ...categoryFind,
      ...JSON.parse(JSON.stringify(body)),
    };
    const response = await this.connection.query(
      "UPDATE category SET name = $1, percentage = $2 WHERE category_id = $3",
      [category.name, category.percentage, Number(params.idCategory)]
    );
    await this.connection.close();
    return response.rowCount;
  }

  async deleteCategory(params: ICategory): Promise<any> {
    const ifExists = await this.findCategory(params);
    if (!ifExists) {
      return false;
    }
    const response = await this.connection.query(
      "DELETE category  WHERE category_id = $1",
      [Number(params.idCategory)]
    );
    await this.connection.close();
    return response.rowCount;
  }
}
