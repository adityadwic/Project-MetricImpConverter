"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      res.json("invalid number and unit");
    } else if (!initNum) {
      res.json("invalid number");
    } else if (!initUnit) {
      res.json("invalid unit");
    } else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      );
      res.json({ initNum, initUnit, returnNum, returnUnit, string: string });
    }
  });
};
