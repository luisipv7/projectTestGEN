import { Pool } from "pg";
import IConnection from "../interface/i-connection";
require("dotenv").config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

export default class PgAdapter implements IConnection {
  private connection() {
    const pool = new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    });

    return pool
  }
  public async query(params: any, stmt: string): Promise<any> {
    try {
      const client = await this.connection().connect();
      const data = await client
        .query({
          name: 'Query',
          text: params,
          values: [...stmt],
        })
        .then((R) => R);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  public async close() {
    const client = await this.connection().connect();
    return client.release();
  }
}
