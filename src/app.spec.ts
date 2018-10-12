import * as chai from "chai";

const expect: Chai.ExpectStatic = chai.expect;

describe('Sanity Test', () => {
  describe('mocha', () => {
    it('should run our tests', () => {
      expect(true).to.be.false;
    });
  });
});