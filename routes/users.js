var express = require("express");
var router = express.Router();
const {
  readAllData,
  readFilteredData,
  updateUser,
  deleteUser,
  createUser
} = require("../mongo/users.mongo");
const { validateRequest, user } = require("../middleware/requestValidation");
const usersController = require("../controllers/users.controller");

router.get("/", async (req, res, next) => {
  try {
    let data = await usersController.getUsers(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/dev", user, validateRequest, async (req, res, next) => {
  console.log("hit dev");
  res.send("hit dev");
});

router.post("/", async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    if (req.body) {
      await createUser(req.body);
      res.send(`added ${JSON.stringify(req.body)}`);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    usersController.updateUser(req.body);
    res.send(`updated ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    await deleteUser(req.body);
    res.send(`deleted ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
