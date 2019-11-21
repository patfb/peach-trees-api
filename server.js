require("dotenv").config();
let express = require("express");
var indexRouter = require("./controllers/index");
var usersRouter = require("./controllers/users");
const port = 3000;

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
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
