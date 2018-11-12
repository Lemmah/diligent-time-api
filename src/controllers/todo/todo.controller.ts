import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

import Error from "../../interfaces/error";
import TodoItem from "../../interfaces/todo";
import { TodoModel } from "./../../models/todo/todo.model";

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const todoItem = new TodoModel(req.body);
  try {
    const todo: Document = await todoItem.save();
    res.status(201);
    res.json({ data: todo});
  } catch (err) {
    next(err);
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos: Document[] = await TodoModel.find({});
    res.status(200);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const todo: TodoItem | null = await TodoModel.findOne({ _id: req.params.id });
    if (!todo) {
      const err: Error = new Error("TodoItem not found");
      err.statusCode = 404;
      throw err;
    }
    res.status(200);
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const complete: boolean = req.body.complete;
  try {
    const todo: TodoItem | null = await TodoModel.findById(req.params.id);
    if (!todo) {
      const err: Error = new Error("TodoItem not found");
      err.statusCode = 404;
      throw err;
    }
    todo.complete = complete;
    const updatedTodoItem = await todo.save();
    res.status(200);
    res.json(updatedTodoItem);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await TodoModel.remove({ _id: req.params.id });
    res.status(204);
    res.json({});
  } catch (err) {
    next(err);
  }
};

export default { create, readAll, readOne, update, deleteOne };
