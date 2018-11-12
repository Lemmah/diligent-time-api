import "mocha";
import * as sinon from "sinon";
import { NextFunction, Response, Request } from "express";

import Error from "../../interfaces/error";
import toDoController from "./todo.controller";
import TodoItem from "../../interfaces/todo";
import todoController from "./todo.controller";

const testTodoItem: Partial<TodoItem> = {
  /* tslint:disable:object-literal-sort-keys */
  _id: "randomTestId",
  name: "Go to the Gym",
  owner: "id:xdjlkfdsjlkjlk",
  start_time: new Date(),
  stop_time: new Date(),
  complete: false,
  sessions: 0,
};

describe("Todo Controller Tests", () => {
  const { TodoModel } = require('../../models/todo/todo.model');
  let req: Partial<Request>, res: Partial<Response>, next: Partial<NextFunction>;

  beforeEach(() => {
    req = {
      body: testTodoItem,
    };
    res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  describe("create", () => {
    beforeEach(() => {
      sinon.stub(TodoModel.prototype, "save");
    });

    afterEach(() => {
      (TodoModel.prototype.save as sinon.SinonStub).restore();
    });

    it("should call todoItem save and return item if saved", async () => {
      (TodoModel.prototype.save as sinon.SinonStub).resolves(req.body);

      await toDoController.create(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.prototype.save);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
      sinon.assert.calledWith(res.json as sinon.SinonStub, { data: req.body });
    });

   it("should call the next with error if post not saved", async () => {
      const expectedError: Error = new Error("Something's gone wrong");
      (TodoModel.prototype.save as sinon.SinonStub).rejects(expectedError);

      await toDoController.create(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.prototype.save);
      sinon.assert.called(next as sinon.SinonStub);
      sinon.assert.calledWith(next as sinon.SinonStub, expectedError);
    });
  });

  describe("readAll", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "find");
    });

    afterEach(() => {
      (TodoModel.find as sinon.SinonStub).restore();
    });

    it("should return expected todo models", async () => {
      const expectedModels = [{}, {}];
      (TodoModel.find as sinon.SinonStub).resolves(expectedModels);

      await toDoController.readAll(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.find);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
      sinon.assert.calledWith(res.json as sinon.SinonStub, expectedModels);
    });

    it("should return an error message if something goes wrong", async () => {
      const expectedError: Error = new Error("Something's not right");
      (TodoModel.find as sinon.SinonStub).rejects(expectedError);

      await toDoController.readAll(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.find);
      sinon.assert.called(next as sinon.SinonStub);
      sinon.assert.calledWith(next as sinon.SinonStub, expectedError);
    });
  });

  describe("readOne", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "findOne");
      req['params'] = { id: "randomTestID", };
    });

    afterEach(() => {
      (TodoModel.findOne as sinon.SinonStub).restore();
    });

    it("should return one todo item with specified id", async () => {
      (TodoModel.findOne as sinon.SinonStub).resolves(testTodoItem);

      await toDoController.readOne(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.findOne);
      sinon.assert.calledWith(TodoModel.findOne, { _id: req.params.id });
    });

    it("should throw an error if the specified todo item is not found", async () => {
      const notFoundError: Error = new Error("TodoItem not found");
      notFoundError.statusCode = 404;

      (TodoModel.findOne as sinon.SinonStub).resolves(null);

      await todoController.readOne(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.calledWith(TodoModel.findOne, { _id: req.params.id });
      sinon.assert.called(next as sinon.SinonStub);
      // sinon.assert.calledWith(next as sinon.SinonStub, notFoundError);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "findById");
      sinon.stub(TodoModel.prototype, "save");
      req = {
        params: {
          id: "randomTestID",
        },
        body: {
          complete: true,
        },
      };
    });

    afterEach(() => {
      (TodoModel.findById as sinon.SinonStub).restore();
      (TodoModel.prototype.save as sinon.SinonStub).restore();
    });

    it("should find the todo by id and update complete status", async () => {
      (TodoModel.findById as sinon.SinonStub).resolves(testTodoItem);
      (TodoModel.prototype.save as sinon.SinonStub).resolves(testTodoItem);

      await toDoController.update(<Request>req, <Response>res, <NextFunction>next);
      // finds todo by id
      sinon.assert.called(TodoModel.findById);
      sinon.assert.calledWith(TodoModel.findById as sinon.SinonStub, req.params.id);
      // updates complete status /* Help wanted */
      // sinon.assert.called(TodoModel.prototype.save);
    });

    it("should throw error if todo is not found", async (): Promise<void> => {
      const randomError: Error = new Error("Something went wrong while trying to find");
      randomError.statusCode = 500;
      (TodoModel.findById as sinon.SinonStub).rejects(randomError);

      await todoController.update(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.findById);
      sinon.assert.called(next as sinon.SinonStub);
      sinon.assert.calledWith(next as sinon.SinonStub, randomError);
    });

    it("should throw an error if todo was found but not updated", async (): Promise<void> => {
      const randomError: Error = new Error("Something went wrong while trying to find");
      randomError.statusCode = 500;
      (TodoModel.findById as sinon.SinonStub).resolves(testTodoItem);
      (TodoModel.prototype.save as sinon.SinonStub).rejects(randomError);

      await todoController.update(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(next as sinon.SinonStub);
      /* Help wanted */
      // sinon.assert.calledWith(next as sinon.SinonStub, randomError);
    });

  });

  describe("deleteOne", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "remove");
      req["params"] = { id: "randomTestID" };
    });

    afterEach(() => {
      (TodoModel.remove as sinon.SinonStub).restore();
    });

    it("should remove the todo", async () => {
      (TodoModel.remove as sinon.SinonStub).resolves({});

      await toDoController.deleteOne(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.remove);
      sinon.assert.calledWith(TodoModel.remove, { _id: req.params.id });
      sinon.assert.calledWith(res.status as sinon.SinonStub, 204);
      sinon.assert.calledWith(res.json as sinon.SinonStub, {});
    });

    it("should return an error message if anything goes wrong", async (): Promise<void> => {
      const randomError: Error = new Error("Something wierd occured while trying to delete");
      randomError.statusCode = 500;
      (TodoModel.remove as sinon.SinonStub).rejects(randomError);

      await todoController.deleteOne(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.called(TodoModel.remove);
      sinon.assert.calledWith(TodoModel.remove, { _id: req.params.id });
      sinon.assert.called(next as sinon.SinonStub);
      sinon.assert.calledWith(next as sinon.SinonStub, randomError);
    });
  })
});