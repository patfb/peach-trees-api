var express = require("express");
var router = express.Router();
const { readAllData, readFilteredData, updateUser } = require("../mongo/users");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  const { firstName } = req.query;
  console.log("first name: ", firstName);
  let data;

  try {
    if (firstName) {
      data = await readFilteredData(firstName);
    } else {
      data = await readAllData();
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [
    check("first")
      .isAlpha()
      .isLength({ min: 1 })
      .withMessage("first must be at least 1 character long"),
    check("last")
      .isAlpha()
      .isLength({ min: 1 })
      .withMessage("last must be at least 1 character long")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      if (req.body) {
        // await createUser(req.body);
        res.send(`added ${JSON.stringify(req.body)}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put("/", async (req, res, next) => {
  try {
    await updateUser(req.body);
    res.send(`updated ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
