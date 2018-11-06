import { Request, Response } from "express";
import { Document } from "mongoose";
import TodoItem from "../../interfaces/todo";
import { TodoModel } from "./../../models/todo/todo.model";

function create(req: Request, res: Response): void {
  const todoItem = new TodoModel(req.body);
  todoItem.save()
  .then((todo: Document): void => {
    res.status(201);
    res.json({ status: true, message: todo});
  })
  .catch((error: Error): void => {
    res.status(500);
    res.json({ status: false, error });
  });
}

function readAll(req: Request, res: Response): void {
  TodoModel.find({})
  .then((todos: Document[]): void => {
    res.status(200);
    res.json(todos);
  })
  .catch((error: Error): void => {
    res.status(500);
    res.json(error.message);
  });
}

function readOne(req: Request, res: Response): void {
  TodoModel.findOne({ _id: req.params.id })
  .then((todo: TodoItem | null): void | Error => {
    if (!todo || !Object.keys(todo).length) {
      throw new Error("TodoItem not found");
    }
    res.status(200);
    res.json(todo);
  })
  .catch((error: Error) => {
    res.status(500);
    res.json(error);
  });
}

function update(req: Request, res: Response): void {
  const complete: boolean = req.body.complete;
  TodoModel.findById(req.params.id)
  .then((todo: TodoItem | null): TodoItem => {
    if (!todo || !Object.keys(todo).length) {
      throw new Error("TodoItem not found");
    }
    todo.complete = complete;
    return todo;
  })
  .then((todo: TodoItem): Promise<TodoItem> => {
    return todo.save();
  })
  .then((todo: TodoItem): void => {
    res.status(200);
    res.json(todo);
  })
  .catch((error: Error) => {
    res.status(500);
    res.json(error);
  });
}

function deleteOne(req: Request, res: Response): void {
  TodoModel.remove({ _id: req.params.id })
  .then((todos: TodoItem[]) => {
    res.status(200);
    res.json({ status: true, message: "Todo Deleted Successfully!"});
  })
  .catch((error: Error) => {
    res.status(500);
    res.json({ status: false, error });
  });
}

export default { create, readAll, readOne, update, deleteOne };
