import * as express from "express";
import mainController from "../controllers/main.controller";
import todoRoutes from "./todo/todo.routes";

const router: express.Router = express.Router();
router.get("/", mainController.root);
router.use("/api/v1/todos/", todoRoutes);

export default router;
