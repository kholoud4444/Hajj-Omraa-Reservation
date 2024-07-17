const evar = require('dotenv')
const sql = require('mysql2')
evar.config()

// console.log(process.env.HOST, process.env.DB_USER, process.env.DB_NAME)
const connect = sql.createPool({
    host: 'trans-DB',
    user: 'root',
    password: '1234',
    database: 'trans',
    port: 3306,
}).promise()


connect.query(`CREATE TABLE IF NOT EXISTS inventory (
    Type VARCHAR(20) PRIMARY KEY,
    units BIGINT,
    avail_units BIGINT,
    seats BIGINT,
    free_seats BIGINT
)`).then(() => console.log("INVENTORY TABLE CREATED!!")).catch((error) => console.log(error));

connect.query(`CREATE TABLE IF NOT EXISTS inventory (
    ID INT PRIMARY KEY,
    Username VARCHAR(255)
    )`).then(() => console.log("USERS TABLE CREATED!!")).catch((error) => console.log(error));

connect.query(`INSERT INTO inventory (Type, units, avail_units, seats, free_seats)
                VALUES ("Ground", 0, 0, 0, 0),
                ("AIR", 0, 0, 0, 0),
                ("Nautical voy", 0, 0, 0, 0)
                `).then(() => consolele.log("Inserted!"))
                .catch(() => console.log("This is not the first time here!"));

// const res = connect.query('INSERT INTO inventory (Type ,units, avail_units, seats, free_seats) VALUES ("Ground", 0, 0, 0, 0)');
// connect.query(`SELECT * FROM inventory`)
//   .then(res => {
//     console.log(res[0]);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });
// connect.query("SELECT * FROM inventory")
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.error(err)
//     })
module.exports = connect;