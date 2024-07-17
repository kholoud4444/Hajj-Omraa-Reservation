const mongoose = require("mongoose");

mongoose
  .connect("mongodb://users_db:27017/usersdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Failed to connect to MongoDB:", e.message);
    process.exit(1); // Exit the application if connection fails
  });

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  // Additional error handling can be implemented here
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
