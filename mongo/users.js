const { peachConnect } = require("./client");

let deleteUser = async user => {
  let { client, col } = peachConnect();
  try {
    await col.deleteOne({
      first: user.first,
      last: user.last
    });
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

let updateUser = async user => {
  let { client, col } = await peachConnect();
  try {
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
  let { client, col } = await peachConnect();
  try {
    await col.insertOne({
      first: user.first,
      last: user.last
    });
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

let readAllData = async () => {
  let { client, col } = await peachConnect();
  try {
    const names = await col.find().toArray();
    return names;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};
let readFilteredData = async firstName => {
  let { client, col } = await peachConnect();
  try {
    const matchingNames = await col.find({ first: firstName }).toArray();
    return matchingNames;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

module.exports = {
  readAllData,
  readFilteredData,
  createUser,
  updateUser,
  deleteUser
};
