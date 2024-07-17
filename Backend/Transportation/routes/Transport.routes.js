const controller = require("../controllers/controller")
const express = require("express")
const morgan = require("morgan")
const app = express()
const route = express.Router()
const cors = require("cors");
const { body_valid } = require("../middleware/middleware");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

route.route("/")
    .get(controller.list_trans)
    .post(body_valid, controller.reserve);

route.route("/modify/:sort")
    .patch(body_valid, controller.edit_avail);

route.route("/units")
    .post(body_valid, controller.add_rem_units);

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

app.use('/transport', route)

route.route('/')
    .get(controller.list_trans)
    .post(body_valid ,controller.reserve)

route.route('/modify/:sort')
    .patch(body_valid, controller.edit_avail)
    
route.route('/units')    
    .post(body_valid, controller.add_rem_units)

module.exports = route;
