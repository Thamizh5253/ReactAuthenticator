const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Tham:Tham@cluster1.rqehbqf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB");

    // Return the connected client and database
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
