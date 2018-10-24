import * as mongoose from "mongoose";
import TodoItem from "./../../interfaces/todo";

const Schema = mongoose.Schema;

const TodoSchema: mongoose.Schema = new Schema({
  /* tslint:disable:object-literal-sort-keys */
  name: {
    required: "Todo must have a name",
    type: String,
  },
  owner: {
    required: true,
    type: String,
  },
  start_time: {
    required: true,
    type: Date,
    default: new Date(),
  },
  stop_time: {
    required: false,
    type: Date,
  },
  complete: {
    required: true,
    type: Boolean,
    default: false,
  },
  sessions: {
    required: true,
    type: Number,
    default: 0,
  },
});

let TodoModel: mongoose.Model<TodoItem>;
try {
  TodoModel = mongoose.model<TodoItem>("Todo", TodoSchema);
} catch (e) {
  TodoModel = mongoose.model<TodoItem>("Todo");
}

export { TodoModel };
