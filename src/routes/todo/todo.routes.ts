import * as express from "express";
import { toDoController } from "../../controllers/todo/todo.controller";

class TodoRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("/", toDoController.create);
    this.router.get("/", toDoController.readAll);
    this.router.get("/:id", toDoController.readOne);
    this.router.put("/:id", toDoController.update);
    this.router.delete("/:id", toDoController.delete);
  }
}

export const todoRoutes: express.Router = new TodoRoutes().router;
