const mongoose = require("mongoose");

mongoose
  .connect("mongodb://omras_db:27017/omrasdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
