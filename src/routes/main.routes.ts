import * as express from "express";
import { mainController } from "../controllers/main.controller";

class MainRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.get("/", (req: express.Request, res: express.Response) => {
      mainController.root(req, res);
    });
  }
}

export const mainRoutes: express.Router = new MainRoutes().router;
