const { MongoClient } = require("mongodb");

// Connection URI
const mongoURI = "mongodb://localhost:27017";

async function connectToMongoDB() {
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
