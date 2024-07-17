const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../middleware/admin");
const authorized = require("../middleware/authorize");

router.post("/create/:appid/:userid", async (req, res) => {
  try {
    const appointmentId = req.params.appid;
    const userId = req.params.userid;
    const query = util.promisify(conn.query).bind(conn);
    const { token } = req.headers;
    const requset = {
      appointment_id: appointmentId,
      traveler_id: userId,
    };
    await query("insert into appointment_requests set ? ", requset);
    res.status(200).json({
      msg: "created successfully !",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const requests = await query(
    "SELECT appointment_requests.id, users.email, appointments.from_where, appointments.to_where ,appointment_requests.status, appointments.day_and_time  , appointments.max_number_of_travelers ,appointments.number_of_traveler , appointments.id as appid FROM appointment_requests join appointments join users WHERE appointment_id=appointments.id and traveler_id=users.id;"
  );
  if (!requests[0]) {
    res.status(404).json({ ms: "appointment not found !" });
  }
  res.status(200).json(requests);
});

router.put(
  "/accept/:id/:reqid",
  //admin, 
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // UPDATE appointment_requests SET status=pending 
      await query(
        "UPDATE appointment_requests SET status=  'accepted' where id = ?",
        req.params.reqid
      );
      const number = await query(
        "SELECT number_of_traveler FROM appointments WHERE id=?",
        req.params.id
      );

      const num = number[0].number_of_traveler;
      const newNum = num + 1;
      console.log(number);
      await query(` UPDATE appointments SET number_of_traveler=${newNum}  WHERE id=?`, req.params.id);
      res.status(200).json({
        number
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/decline/:id",
  // admin, 
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // UPDATE appointment_requests SET status=pending 
      await query(
        "UPDATE appointment_requests SET status=  'declined' where id = ?",
        req.params.id
      );

      res.status(200).json({
        msg: "rejected successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/history/:id", async (req, res) => { //user id
  const query = util.promisify(conn.query).bind(conn);
  const appointment = await query(
    "SELECT   appointment_requests.status , appointments.name , appointments.image ,appointments.id , appointments.from_where, appointments.to_where,appointments.ticket_price, appointments.day_and_time  FROM appointment_requests join appointments WHERE appointment_requests.traveler_id= ? and appointment_requests.appointment_id=appointments.id",
    req.params.id
  );

  if (!appointment) {
    res.status(404).json({ ms: "appointment not found !" });
  }
  appointment.map((a) => {
    a.image = "http://" + req.hostname + ":4000/" + a.image;

  });
  res.status(200).json(appointment);
});

module.exports = router;