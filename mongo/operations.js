const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.CONNECTION_STRING;

let createClient = () => {
  return new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

let connectToPeachTrees = async client => {
  await client.connect();
  console.log("Connected to the server");
  return client.db("peach_trees").collection("names");
};

let getAllData = async () => {
  const client = createClient();
  try {
    let collection = await connectToPeachTrees(client);
    const names = await collection.find().toArray();
    console.log("names are", names);
    return names;
  } catch (err) {
    throw err;
  } finally {
    client.close();
    console.log("getAllData client was closed");
  }
};
let getFilteredData = async firstName => {
  const client = createClient();
  try {
    let collection = await connectToPeachTrees(client);
    const matchingNames = await collection.find({ first: firstName }).toArray();
    console.log("matchingNames are", matchingNames);
    return matchingNames;
  } catch (err) {
    throw err;
  } finally {
    client.close();
    console.log("getFilteredData client was closed");
  }
};

module.exports = { getAllData, getFilteredData };
