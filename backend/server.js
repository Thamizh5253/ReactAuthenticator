const express = require("express");
// const http = require("http");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { connectToMongoDB } = require("./dblocal");

const PORT = process.env.PORT || 5000;
const DB = process.env.DB || "MERN1";

let likes = 0;
// const { MongoClient } = require("mongodb");

// let likeCount = process.env.LIKE ? parseInt(process.env.LIKE, 10) : 0;
// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Enable CORS for all routes
app.use(cors());

connectToMongoDB();
// // Login route

app.post("/login", async (req, res) => {
  const { uid, password } = req.body;
  // console.log(uid, password);

  try {
    // Connect to the MongoDB server
    const client = await connectToMongoDB();

    // Access the database
    const database = client.db(DB);

    // Access the collection
    const collection = database.collection("login");

    // Find the user by username
    const user = await collection.findOne({ ruid: uid });

    if (!user) {
      // User not found
      return res.status(201).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.rpassword);
    // console.log(user.rpassword);
    if (passwordMatch) {
      // Passwords match, user is authenticated
      res.status(200).json({ message: "Login successful" });
    } else {
      // Passwords do not match
      res.status(201).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { ruid, rpassword } = req.body;

  // console.log(ruid, rpassword);
  try {
    // Connect to the MongoDB server
    const client = await connectToMongoDB();

    // Access the database
    const database = client.db(DB);

    // Access the collection
    const collection = database.collection("login");

    // Insert user data into the collection
    const existingUser = await collection.findOne({ ruid });

    if (existingUser) {
      // Username already exists
      res.status(201).json({ message: "Username already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(rpassword, saltRounds);

      const result = await collection.insertOne({
        ruid,
        rpassword: hashedPassword,
      });

      console.log("User inserted:", result.acknowledged);

      // Respond with a success message
      res.status(200).json({ message: "User signed up successfully" });
    }
  } catch (error) {
    // console.error("Error signing up:", error);
    res.status(404).json({ error: "Internal Server Error" });
  }
});

app.post("/api/increment-like", async (req, res) => {
  //  console.log(likeCount);
  likes += 1;

  // var likeCount = req.body;
  console.log("hello", likes);
  // likeCount += 1;
  try {
    // Connect to the MongoDB server
    const client = await connectToMongoDB();

    // Access the database
    const database = client.db(DB);

    // Access the collection
    const collection = database.collection("like");

    // Assuming you have a specific document you want to update (replace with your logic)
    const filter = { mode: "launch" };

    // Update the likeCount field by 1
    const update = { $inc: { like: 1 } };

    // Perform the update operation
    const result = await collection.updateOne(filter, update);
    // console.log(result);
    // Respond with a success message or the updated document
    res.status(200).json({ like: likes });
  } catch (error) {
    // console.error("Error updating like count:", error);
    res.status(204).json({ error: "Internal Server Error" });
  }
});

app.get("/api/like-count", async (req, res) => {
  try {
    // Connect to the MongoDB server
    const client = await connectToMongoDB();

    // Access the database
    const database = client.db(DB);

    // Access the collection
    const collection = database.collection("like");

    // Assuming you have a specific document you want to update (replace with your logic)
    const result = await collection.findOne(
      { mode: "launch" },
      { _id: 1, like: 1, mode: 1 }
    );
    console.log(result);
    likes = result.like;
    if (result) {
      res.status(200).json({ likes: result.like });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  // res.json({ likes: likeCount });
});
// const data = {
//   message: "Hello from the server!",
// };
// app.get("/api", (req, res) => {
//   res.json(data);
// });

// Start the server
// const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
