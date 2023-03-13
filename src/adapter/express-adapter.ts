import express from "express";
import bodyParser from "body-parser";
import HttpServer from "../interface/http-server";
import * as swaggerUi from "swagger-ui-express";
const swaggerDocument  = require( '../docs/swagger.json')
export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
  }
  async register(
    method: string,
    url: string,
    callback: Function
  ): Promise<void> {
    this.app.use(express.json());
    this.app[method](url, async function (req: any, res: any) {
      const output = await callback(req.params, req.body);
      res.status(output.status).send(output);
    });
  }

  async listen(port: number): Promise<void> {
    return this.app.listen(port);
  }

  swagger() {
    return this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
}
