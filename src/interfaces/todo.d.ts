import * as mongoose from "mongoose";

export default interface TodoItem extends mongoose.Document {
  name: string;
  owner: string;
  start_time: Date;
  stop_time: Date;
  complete: boolean;
  sessions: number;
  [key: string]: any;
}