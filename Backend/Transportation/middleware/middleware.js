const {body, param} = require("express-validator");
// const { param } = require("../routes/Transport.routes");

const body_valid =
    [
        param('sort')
            .notEmpty()
            .withMessage("Please select a travalling plan"),
        body('u_construct')
            .isInt()
    ]

module.exports = {body_valid};
