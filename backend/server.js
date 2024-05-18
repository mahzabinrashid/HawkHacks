const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// Define a simple route
app.get("/api", (req, res) => {
  res.send("Hello, MERN!");
});

// Define a route to fetch data
app.get("/data", (req, res) => {
  const data = [
    { id: 1, name: "Item 1", description: "This is item 1" },
    { id: 2, name: "Item 2", description: "This is item 2" },
  ];
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
