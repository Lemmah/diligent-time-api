import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import { mainRoutes } from "./routes/main.routes";

class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost/diligentTime";

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use("/", mainRoutes);
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;
