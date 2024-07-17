const mongoose = require("mongoose");

mongoose
  .connect("mongodb://users_db:27017/usersdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Failed to connect to MongoDB:", e.message);
    process.exit(1); // Exit the application if connection fails
  });

const db = mongoose.connection;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Event listener for disconnection
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Event listener for reconnection
mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB');
});

// Event listener for connection errors
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Event listener for process termination
process.on('SIGINT', async () => {
  try {
      // Close the Mongoose connection when the process is terminated
      await mongoose.connection.close();
      console.log('Mongoose connection closed');
      process.exit(0);
  } catch (error) {
      console.error('Error closing Mongoose connection:', error.message);
      process.exit(1);
  }
});

module.exports = db;
