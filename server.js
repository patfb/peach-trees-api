require("dotenv").config();
let express = require("express");
let app = express();
const port = 3000;
const { getAllData, getFilteredData } = require("./mongo/operations");

// localhost:3000/api/names
// localhost:3000/api/names?firstName=Jim
app.get("/api/names", async (req, res, next) => {
  const { firstName } = req.query;
  console.log("first name: ", firstName);
  let data;

  try {
    if (firstName) {
      data = await getFilteredData(firstName);
    } else {
      data = await getAllData();
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
