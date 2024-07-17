// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express"); //express عشان نقوم على السيرفر كله

const cors = require("cors");

const app = express(); //call to express

const multer = require('multer');
const mysql = require('mysql');
// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED ==> based on bofy parser to be jason
app.use(express.static("upload"));
// app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./login_register/routes/Reg.routes");
const appointments = require("./routes/Appointments");
const request = require("./Request/routes/Request.routes");
const travelers = require("./routes/Traveler");
const transport = require("./Transportation/routes/Transport.routes")

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/auth", auth);
app.use("/appointments", appointments);
app.use("/traveler", travelers);
app.use("/request", request);
app.use("/transport", transport)

// ====================  RUN THE APP  ====================
app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING");
});
