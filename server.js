require("dotenv").config();
let express = require("express");
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");

const { urlLogger, postBodyLogger } = require("./middleware/logger");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(urlLogger);
app.post("*", postBodyLogger);

app.use("/", indexRouter);

/* localhost:3000/users*/
app.use("/users", usersRouter);

/* error handling */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = { app };
