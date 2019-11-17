const { createClient } = require("./client");
const DB_NAME = "peach_trees";

let connectToPeachTrees = async client => {
  await client.connect();
  console.log("Connected to the server");
  return client.db(DB_NAME).collection("names");
};

let updateUser = async user => {
  const client = createClient();
  try {
    await client.connect();
    console.log("connected");
    const col = client.db(DB_NAME).collection("names");
    await col.updateOne(
      {
        first: user.first,
        last: user.last
      },
      { $set: { first: "bananas", last: "oranges" } }
    );
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

let createUser = async user => {
  const client = createClient();
  try {
    await client.connect();
    console.log("connected");
    const db = client.db(DB_NAME);
    await db.collection("names").insertOne({
      first: user.first,
      last: user.last
    });
  } catch (err) {
  } finally {
    client.close();
    console.log("client closed");
  }
};

let readAllData = async () => {
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
    console.log("client closed");
  }
};
let readFilteredData = async firstName => {
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
    console.log("client closed");
  }
};

module.exports = { readAllData, readFilteredData, createUser, updateUser };
