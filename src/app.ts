import express from "express";
import * as bodyParser from "body-parser";
import { mainRoutes } from "./routes/main.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/", mainRoutes);
  }
}

export default new App().app;