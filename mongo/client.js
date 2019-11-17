const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.CONNECTION_STRING;

let createClient = () => {
  return new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = { createClient };
