const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.CONNECTION_STRING;

let peachConnect = async () => {
  let client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log("Connected to the server");
    let col = client.db("peach_trees").collection("names");
    return { client, col };
  } catch (err) {
    console.log("Connection error!");
    throw err;
  }
};

module.exports = { peachConnect };
