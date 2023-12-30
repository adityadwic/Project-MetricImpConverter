const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  const convertHandler = new ConvertHandler();

  suite("Function convertHandler.getNum(input)", function () {
    // Test valid input
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal number input", function () {
      assert.equal(convertHandler.getNum("3.5gal"), 3.5);
    });

    test("Fractional input", function () {
      assert.equal(convertHandler.getNum("1/2mi"), 0.5);
    });

    test("Fractional input with decimal", function () {
      assert.equal(convertHandler.getNum("9/3.3L"), 9 / 3.3);
    });

    // Test invalid input
    // test("No numerical input", function () {
    //   assert.isUndefined(convertHandler.getNum("L"), 1);
    // });

    test("Invalid number", function () {
      assert.isUndefined(convertHandler.getNum("32/3/3L"), undefined);
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    // Test valid input
    test("Valid unit input", function () {
      assert.equal(convertHandler.getUnit("5km"), "km");
    });

    // Test invalid input
    test("Invalid unit", function () {
      assert.isUndefined(convertHandler.getUnit("5invalid"));
    });

    test("No unit", function () {
      assert.isUndefined(convertHandler.getUnit("5"));
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    // Test valid input
    test("Valid return unit", function () {
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
    });

    // Test invalid input
    test("Invalid return unit", function () {
      assert.isUndefined(convertHandler.getReturnUnit("invalid"));
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    // Test valid input
    test("Valid unit spelling", function () {
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    });

    // Test invalid input
    test("Invalid unit spelling", function () {
      assert.equal(convertHandler.spellOutUnit("invalid"), "don't know");
    });
  });

  suite("Function convertHandler.convert(initNum, initUnit)", function () {
    // Test valid input
    test("Valid conversion", function () {
      assert.approximately(convertHandler.convert(5, "km"), 3.10686, 0.1);
    });

    // Test invalid input
    test("Invalid conversion", function () {
      assert.isUndefined(convertHandler.convert("invalid", "km"));
    });
  });

  suite(
    "Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)",
    function () {
      // Test valid input
      test("Valid string conversion", function () {
        assert.equal(
          convertHandler.getString(5, "km", 3.10686, "mi"),
          "5 kilometers converts to 3.10686 miles",
        );
      });

      // Test invalid input
      test("Invalid string conversion", function () {
        assert.equal(
          convertHandler.getString("invalid", "km", 3.10686, "mi"),
          "invalid kilometers converts to 3.10686 miles",
        );
      });
    },
  );
});
