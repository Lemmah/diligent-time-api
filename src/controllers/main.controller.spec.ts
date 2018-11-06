import "mocha";
import * as sinon from "sinon";
import { Response, Request } from "express";
import mainController from "./main.controller";

describe("Main Controller Tests", () => {
  describe("main controller", () => {
    it("should handle requests for the root resource", () => {
      let req: Partial<Request> = {};
      let res: Partial<Response> = {
        status: sinon.stub(),
        send: sinon.stub(),
      };

      mainController.root(<Request>req, <Response>res);

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
      sinon.assert.calledWith(res.send as sinon.SinonStub, {
        message: "Welcome to the Diligent Time API!",
      });
    });
  })
});