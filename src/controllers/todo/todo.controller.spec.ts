import "mocha";
import * as sinon from "sinon";
import { Response, Request } from "express";
import toDoController from "./todo.controller";
import TodoItem from "../../interfaces/todo";

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

  describe("create", () => {
    let req: Partial<Request>, res: Partial<Response>;
    beforeEach(() => {
      sinon.stub(TodoModel.prototype, "save");
      req = {
        body: testTodoItem,
      };
      res = {
        status: sinon.stub(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      (TodoModel.prototype.save as sinon.SinonStub).restore();
    });

    it("should call todoItem save and return item if saved", async () => {
      (TodoModel.prototype.save as sinon.SinonStub).resolves(req.body);

      await toDoController.create(<Request>req, <Response>res);

      sinon.assert.called(TodoModel.prototype.save);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
      sinon.assert.calledWith(res.json as sinon.SinonStub, { status: true, message: req.body });
    });

    xit("should return error if post not saved", async () => {
      const expectedError: Error = new Error("Something's gone wrong");
      (TodoModel.prototype.save as sinon.SinonStub).rejects(expectedError);

      await toDoController.create(<Request>req, <Response>res);

      sinon.assert.called(TodoModel.prototype.save);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 500);
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
      let req: Partial<Request> = { };
      let res: Partial<Response> = {
        status: sinon.stub(),
        json: sinon.stub(),
      };

      await toDoController.readAll(<Request>req, <Response>res);

      sinon.assert.called(TodoModel.find);
      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
      sinon.assert.calledWith(res.json as sinon.SinonStub, expectedModels);
    });

    xit("should return an error message if something goes wrong", () => {
      const expectedError: Error = new Error("Something's not right");
      (TodoModel.find as sinon.SinonStub).rejects(expectedError);

    });
  });

  describe("readOne", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "findOne");
    });

    afterEach(() => {
      (TodoModel.findOne as sinon.SinonStub).restore();
    });

    it("should return one todo item with specified id", async () => {
      (TodoModel.findOne as sinon.SinonStub).resolves(testTodoItem);
      let req: Partial<Request> = {
        params: {
          id: "randomTestID",
        }
      };
      let res: Partial<Response> = {
        status: sinon.stub(),
        json: sinon.stub(),
      };

      await toDoController.readOne(<Request>req, <Response>res);

      sinon.assert.called(TodoModel.findOne);
    });

    xit("should throw an error if the specified todo item is not found");
  });

  describe("update", () => {
    let req: Partial<Request> , res: Partial<Response>;
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
      res = {
        status: sinon.stub(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      (TodoModel.findById as sinon.SinonStub).restore();
      (TodoModel.prototype.save as sinon.SinonStub).restore();
    });

    it("should find the todo by id and update complete status", async () => {
      (TodoModel.findById as sinon.SinonStub).resolves(testTodoItem);
      (TodoModel.prototype.save as sinon.SinonStub).resolves(testTodoItem);

      await toDoController.update(<Request>req, <Response>res);
      // finds todo by id
      sinon.assert.called(TodoModel.findById);
      sinon.assert.calledWith(TodoModel.findById as sinon.SinonStub, req.params.id);
      // updates complete status
      //sinon.assert.called(TodoModel.prototype.save);
    });

    xit("should throw error if todo does not exist");

    xit("should return an error message if something goes wrong");

  });

  describe("deleteOne", () => {
    beforeEach(() => {
      sinon.stub(TodoModel, "remove");
    });

    afterEach(() => {
      (TodoModel.remove as sinon.SinonStub).restore();
    });

    it("should remove the todo", async () => {
      const remainingTodos: Partial<TodoItem>[] = [{}, {}];
      (TodoModel.remove as sinon.SinonStub).resolves(remainingTodos);
      let req: Partial<Request> = {
        params: {
          id: "randomTestID",
        }
      };
      let res: Partial<Response> = {
        status: sinon.stub(),
        json: sinon.stub(),
      };

      await toDoController.deleteOne(<Request>req, <Response>res);

      sinon.assert.called(TodoModel.remove);
      sinon.assert.calledWith(TodoModel.remove, { _id: req.params.id });
      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
      sinon.assert.calledWith(res.json as sinon.SinonStub, { status: true, message: "Todo Deleted Successfully!"});
    });

    xit("should return an error message if anything goes wrong");
  })
});