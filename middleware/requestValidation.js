const { check, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

let user = [
  check("first")
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character.")
    .isAlpha()
    .withMessage("First name must only be alpha"),
  check("last")
    .isLength({ min: 1 })
    .withMessage("Last name must be at least 1 character.")
    .isAlpha()
    .withMessage("Last name must only be alpha")
];

module.exports = { validateRequest, user };
