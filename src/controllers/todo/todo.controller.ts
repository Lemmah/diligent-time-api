import { Request, Response } from "express";
import { Document } from "mongoose";
import TodoModel from "./../../models/todo/todo.model";

class TodoController {
  public create(req: Request, res: Response): Promise<void> {
    const todoItem = new TodoModel(req.body);
    return todoItem.save()
    .then((todo: Document): void => {
      res.status(201);
      res.json({ status: true, message: todo.toObject() });
    })
    .catch((error: Error): void => {
      res.status(500);
      res.json({ status: false, error });
    });
  }

  public read(req: Request, res: Response): void {
    res.status(200);
    res.send();
  }

  public update(req: Request, res: Response): void {
    res.status(200);
    res.send();
  }

  public delete(req: Request, res: Response): void {
    res.status(200);
    res.send();
  }
}

export const toDoController: TodoController = new TodoController();
