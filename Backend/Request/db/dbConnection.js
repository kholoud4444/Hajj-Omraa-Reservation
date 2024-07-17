const mysql = require("mysql2");
const connection = mysql.createPool({
  host: "request-DB",
  user: "root",
  password: "1234",
  database: "bus_booking",
  port: 3306,
}).promise();


connection.query(`CREATE TABLE IF NOT EXISTS appointment_requests (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  appointment_id VARCHAR(255) NOT NULL,
  traveler_id VARCHAR(255) NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  type varchar(255) NOT NULL
)`).then(() => console.log("Welcome for the first time .. !")).catch(() => console.log("Welcome back!"))

// connection.query(`CREATE TABLE IF NOT EXISTS users (
//   id int(11) NOT NULL,
//   username int(11) NOT NULL
// )`)




module.exports = connection;
