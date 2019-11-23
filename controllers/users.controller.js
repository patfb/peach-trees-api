const {
  readAllData,
  readFilteredData,
  updateUser,
  deleteUser,
  createUser
} = require("../mongo/users.mongo");

let getUsers = async ({ first, last }) => {
  console.log(`firstName: ${first}`);
  return first ? await readFilteredData(first) : await readAllData();
};

module.exports = { getUsers };
