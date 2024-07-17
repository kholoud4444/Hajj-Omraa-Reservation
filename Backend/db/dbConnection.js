const mysql = require("mysql"); //عشان نقوم mysql على السيرفر
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bus_booking",
  port: "3306",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("DB CONNECTED");
});

module.exports = connection;
