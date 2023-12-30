const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // replace with the actual path to your Express app file

const assert = chai.assert;
chai.use(chaiHttp);

describe("Functional Tests", function () {
  it("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(app)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isNumber(res.body.initNum);
        assert.isString(res.body.initUnit);
        assert.isNumber(res.body.returnNum);
        assert.isString(res.body.returnUnit);
        assert.isString(res.body.string);
        done();
      });
  });

  it("Convert an invalid input such as 32g: GET request to /api/convert", function (done) {
    chai
      .request(app)
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid unit");
        done();
      });
  });

  it("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function (done) {
    chai
      .request(app)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
        done();
      });
  });

  it("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
    chai
      .request(app)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });

  it("Convert with no number such as kg: GET request to /api/convert", function (done) {
    chai
      .request(app)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // assert.equal(res.body, "invalid number");
        done();
      });
  });
});
