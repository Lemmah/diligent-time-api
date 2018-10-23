import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema: mongoose.Schema = new Schema({
  /* tslint:disable:object-literal-sort-keys */
  name: {
    required: "Name is required",
    type: String,
  },
  email: {
    required: "Email is required",
    type: String,
  },
  password: {
    required: "Password is required",
    type: "String",
  },
  location: {
    required: "Location is required",
    type: "String",
  },
});

let UserModel: mongoose.Model<mongoose.Document>;
try {
  UserModel = mongoose.model("User", UserSchema);
} catch (e) {
  UserModel = mongoose.model("User");
}

export default UserModel;
