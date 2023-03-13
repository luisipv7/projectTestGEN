import { Category } from "../entities/category";
import IConnection from "../interface/i-connection";
import ICategory from "../interface/interfaces";

export default class CategoryRespository {
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

  async findCategory(idCategory: ICategory): Promise<any> {
    const response = await this.connection.query(
      "SELECT * FROM category WHERE category_id = $1",
      [+idCategory.idCategory]
    );
    await this.connection.close();
    return response.rows[0];
  }

  async updateCategory(params: ICategory, body: Category): Promise<any>{
    const ifExists = await this.connection.query(
      "SELECT * FROM category where category_id = $1",
      [params.idCategory]
    );

    if (!ifExists.rowCount) {
      return false;
    }
    try {
      const response = await this.connection.query(
        "UPDATE category SET name = $1, percentage = $2 WHERE category_id = $3",
        [body.name, body.percentage, Number(params.idCategory)]
      );
      await this.connection.close();
      return response.rowCount;
    } catch (error) {
      console.error(error);
      
    }
  }
}