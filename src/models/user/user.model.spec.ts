import * as chai from "chai";
import { UserModel } from "./user.model";
import User from "../../interfaces/user";
import "mocha";

const expect = chai.expect;
const testUser: User = {
  name: "Lemayian JN",
  email: "test@lemayian.africa",
  password: "hashed_test_pass",
  location: "Nairobi, Kenya"
};
const invalidateUser = (field: string): User => {
  const testUserData: User = Object.assign({}, testUser);
  testUserData[field] = "";
  return testUserData;
};

describe("User Model Tests", () => {
  describe("user", () => {
    it("should be invalid if name is empty", (done) => {
      const user = new UserModel(invalidateUser('name'));
      user.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it("should be invalid if email is emtpy", (done) => {
      const user = new UserModel(invalidateUser('email'));
      user.validate((err) => {
        expect(err.errors.email).to.exist;
        done();
      });
    });

    it("should be invalid if password is empty", (done) => {
      const user = new UserModel(invalidateUser('password'));
      user.validate((err) => {
        expect(err.errors.password).to.exist;
        done();
      });
    });

    it("should be invalid if location is empty", (done) => {
      const user = new UserModel(invalidateUser('location'));
      user.validate((err) => {
        expect(err.errors.location).to.exist;
        done();
      });
    });
  });
});