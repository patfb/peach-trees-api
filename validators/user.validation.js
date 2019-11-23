const { check } = require("express-validator");

let user = [
  check("first")
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character.")
    .isAlpha()
    .withMessage("First name must only be alpha")
];

module.exports = { user };
