require("dotenv").config();
let express = require("express");
let app = express();
const assert = require("assert");
const port = 3000;

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.CONNECTION_STRING;
console.log("CONNECTION_STRING is", uri);

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db("glacier");

  const collection = db.collection("sample_mflix.movies");
  results = collection
    .find({})
    .limit(1)
    .toArray(function(err, movies) {
      assert.equal(null, err);
      client.close();
    });

  console.log(results);
});

// localhost:3000/test
app.get("/test", (req, res) => {
  res.send("works!");
});

// localhost:3000/user/james
app.get("/user/:id", function(req, res) {
  res.send(`user is ${req.params.id}`);
});

// localhost:3000/question?animal=butterfly
app.get("/question", function(req, res) {
  res.send(`query string is ${JSON.stringify(req.query)}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
