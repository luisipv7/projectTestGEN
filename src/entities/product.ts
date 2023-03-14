export class Product {
  public readonly name: string;
  public readonly description: number;
  public readonly price: number;
  public readonly idCategory: number;

  constructor(
    name: string,
    description: number,
    price: number,
    idCategory: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.idCategory = idCategory;
  }

  public static create(productData: Product): Product {
    const { name, description, price, idCategory } = productData;
    return new Product(name, description, price, idCategory);
  }
}
