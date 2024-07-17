const { validationResult } = require("express-validator");

const conn = require("../db/dbConnection");
const util = require("util"); // helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res, next) => {
  try {
    // TODO
    // Get login credentials and store them in variables

    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
    const user = await query("select * from users where email = ?", [
      req.body.email,
    ]);
    // await query("UPDATE users SET status ='active' WHERE id = 1");
    const id = user[0].id;
    await query("UPDATE users SET status ='active' WHERE id = ?", id);
    if (!user) {
      res.status(404).json({
        errors: [
          {
            msg: "email or password not found !",
          },
        ],
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (checkPassword) {
      // 3- REMOVE PASSWORD FIELD FROM USER OBJECT BEFORE SENDING AS RESPONSE
      delete user[0].password;
      console.log(user.token);
      // 4- SEND RESPONSE WITH USER OBJECT
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({
        errors: [
          {
            msg: "email or password not found !",
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
};
