import * as mongoose from "mongoose";

export default interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  location: string;
  [key: string]: any;
}