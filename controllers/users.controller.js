const mongo = require("../mongo/users.mongo");

let getUsers = async ({ first, last }) => {
  console.log(`firstName: ${first}`);
  return first
    ? await mongo.readFilteredData(first)
    : await mongo.readAllData();
};

let updateUser = async ({ first, last }) => {
  return await mongo.updateUser({ first, last });
};

module.exports = { getUsers, updateUser };
