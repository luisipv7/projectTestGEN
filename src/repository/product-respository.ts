import { Product } from "../entities/product";
import IConnection from "../interface/i-connection";
import IProduct from "../interface/interfaces";

export default class ProductRespository {
  constructor(readonly connection: IConnection) {}

  async createProduct(body: Product): Promise<any> {
    const ifExists = await this.connection.query(
      "SELECT * FROM product where name like $1",
      [`%${body.name}%`]
    );

    if (ifExists.rowCount) {
      return false;
    }

    const response = await this.connection.query(
      "INSERT INTO product (name, description, price, category_id ) VALUES ($1, $2, $3, $4)",
      [body.name, body.description, body.price, body.idCategory]
    );
    return response;
  }

  async findProduct(idProduct: IProduct): Promise<Product> {
    const response = await this.connection.query(
      "SELECT * FROM product WHERE product_id = $1",
      [+idProduct.idProduct]
    );
    await this.connection.close();
    return response.rows[0];
  }

  async updateProduct(params: IProduct, body: Product): Promise<any> {
    const productFind = await this.findProduct(params);
    if (!productFind) {
      return false;
    }
    const product: Product = { ...body, ...productFind };
    const response = await this.connection.query(
      "UPDATE product SET name = $1, description = $2, price = $3, category_id = $4   WHERE product_id = $5",
      [
        product.name,
        product.description,
        product.price,
        product.idCategory,
        Number(params.idCategory),
      ]
    );
    await this.connection.close();
    return response.rowCount;
  }

  async deleteProduct(params: IProduct): Promise<any> {
    const ifExists = await this.findProduct(params);
    if (!ifExists) {
      return false;
    }
    const response = await this.connection.query(
      "DELETE category  WHERE product_id = $1",
      [Number(params.idProduct)]
    );
    await this.connection.close();
    return response.rowCount;
  }
}
