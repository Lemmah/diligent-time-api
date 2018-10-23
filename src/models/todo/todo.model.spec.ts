import * as chai from "chai";
import TodoModel from "./todo.model";
import TodoItem from "../../interfaces/todo";
import "mocha";

const expect = chai.expect;
const testTodoItem: TodoItem = {
  /* tslint:disable:object-literal-sort-keys */
  name: "Go to the Gym",
  owner: "id:xdjlkfdsjlkjlk",
  start_time: new Date(),
  stop_time: new Date(),
  complete: false,
  sessions: 0,
}
const invalidateTodoItem = (field: string): TodoItem => {
  const testTodoItemData: TodoItem = Object.assign({}, testTodoItem);
  testTodoItemData[field] = "";
  return testTodoItemData;
};

describe("Todo Model Tests", () => {
  describe("todo item", () => {
    it("should be invalid if name is empty", (done) => {
      const todoItem = new TodoModel(invalidateTodoItem('name'));
      todoItem.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it("should be invalid if owner is empty", (done) => {
      const todoItem = new TodoModel(invalidateTodoItem('owner'));
      todoItem.validate((err) => {
        expect(err.errors.owner).to.exist;
        done();
      });
    });

    it("should be invalid if start time is empty", (done) => {
      const todoItem = new TodoModel(invalidateTodoItem('start_time'));
      todoItem.validate((err) => {
        expect(err.errors.start_time).to.exist;
        done();
      });
    });

    it("should be invalid if complete status is empty", (done) => {
      const todoItem = new TodoModel(invalidateTodoItem('complete'));
      todoItem.validate((err) => {
        expect(err.errors.complete).to.exist;
        done();
      });
    });

    it("should be invalid if sessions count is empty", (done) => {
      const todoItem = new TodoModel(invalidateTodoItem('sessions'));
      todoItem.validate((err) => {
        expect(err.errors.sessions).to.exist;
        done();
      });
    });
  });
});
