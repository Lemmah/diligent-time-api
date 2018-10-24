import "mocha";
import * as sinon from "sinon";
import { Response, Request } from "express";
import { toDoController } from "./todo.controller";
import TodoItem from "../../interfaces/todo";

const testTodoItem: TodoItem = {
  /* tslint:disable:object-literal-sort-keys */
  name: "Go to the Gym",
  owner: "id:xdjlkfdsjlkjlk",
  start_time: new Date(),
  stop_time: new Date(),
  complete: false,
  sessions: 0,
};

describe("Todo Controller Tests", () => {
  describe("create", () => {
    let req: Partial<Request>, res: Partial<Response>;
    beforeEach(() => {
      req = {
        body: sinon.stub(),
      };
      res = {
        status: sinon.stub(),
        send: sinon.stub(),
      };
    });

    xit("should create a new todo", () => {
      req.body = testTodoItem;
      toDoController.create(<Request>req, <Response>res);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
    });
    xit("should return error if post not saved");
  });
});