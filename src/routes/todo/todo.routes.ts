import * as express from "express";
import toDoController from "../../controllers/todo/todo.controller";

const router: express.Router = express.Router();

router.post("/", toDoController.create);
router.get("/", toDoController.readAll);
router.get("/:id", toDoController.readOne);
router.put("/:id", toDoController.update);
router.delete("/:id", toDoController.deleteOne);

export default router;
