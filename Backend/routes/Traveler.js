// Core node modules
const fs = require("fs"); // file system

// Express Import
const router = require("express").Router();
const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// File modules
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper

// Hash password function
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Generate token function
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Register a new user
const { check, validationResult } = require("express-validator");

router.post(
  "/create",
  admin,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not valid"),
    check("password").notEmpty().withMessage("Password is required"),
    check("phone").notEmpty().withMessage("Phone number is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;
    const hashedPassword = hashPassword(password);
    const token = generateToken();

    const user = {
      name,
      email,
      password: hashedPassword,
      phone,
      token,
    };

    conn.query("INSERT INTO users SET ?", user, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    });
  }
);

// UPDATE Appointment [ADMIN]
// router.put(
//   "/:id", // params
//   admin,
//   body("name")
//     .isString()
//     .withMessage("please enter a valid name")
//     // .isLength({ min: 10, max: 20 })
//     // .withMessage("name should be between (10-20) character")
//     ,
//   body("email")
//     .isEmail()
//     .withMessage("please enter a valid email")
//     .isLength({ min: 5 }),
//   body("phone")
//     .isMobilePhone()
//     .withMessage("please enter a valid number")
//     .isLength({ min: 5 }),

//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const query = util.promisify(conn.query).bind(conn);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // 2- CHECK IF traveler EXISTS OR NOT
//       const traveler = await query("select * from users where id = ?", [
//         req.params.id,
//       ]);
//       if (!traveler[0]) {
//         res.status(404).json({ ms: "traveler not found !" });
//         return;
//       }

//       // 3- PREPARE MOVIE OBJECT
//       const travelerObj = {
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//       };

//       // 4- UPDATE MOVIE
//       await query("update users set ? where id = ?", [
//         travelerObj,
//         traveler[0].id,
//       ]);

//       res.status(200).json({
//         msg: "traveler updated successfully",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

// DELETE APPOINTMENT [ADMIN]
// router.delete(
//   "/:id", // params
//   admin,
//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const query = util.promisify(conn.query).bind(conn);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       // 2- CHECK IF Appointment EXISTS OR NOT
//       const traveler = await query("select * from users where id = ?", [
//         req.params.id,
//       ]);
//       if (!traveler[0]) {
//         res.status(404).json({ ms: "traveler not found !" });
//         return;
//       }

//       await query("delete from users where id = ?", [traveler[0].id]);
//       res.status(200).json({
//         msg: "Traveler deleted successfully",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

// // SHOW traveler [ADMIN, USER]
// router.get("/getone/:id", async (req, res) => {
//   const query = util.promisify(conn.query).bind(conn);
//   const traveler = await query("select * from users where id = ?", [
//     req.params.id,
//   ]);
//   if (!traveler[0]) {
//     res.status(404).json({ ms: "traveler not found !" });
//   }
//   res.status(200).json(traveler[0]);
// });

// //SHOW ALL
// router.get("/all", async (req, res) => {
//   const query = util.promisify(conn.query).bind(conn);
//   const traveler = await query("select * from users where type = 'traveler' ");
//   if (!traveler[0]) {
//     res.status(404).json({ ms: "traveler not found !" });
//   }
//   res.status(200).json(traveler);
// });

module.exports = router;
