const db = require("../DB/connection")
const {validationResult} = require("express-validator")

// functions to abstract
const seats_calc = (sort) => {
    if (sort === "Ground") {
        return 30;
    }
    else if (sort === "AIR") {
        return 80;
    }
    else if (sort === "Nautical voy") {
        return 130;
    }
    else {
        return 0;
    }
}

const query_handler = async (sort, sign, u_construct) => {
    const seats = seats_calc(sort)
    if (seats === 0) return false;
    const ret = await db.query(`UPDATE inventory
            SET avail_units = avail_units - ?
            , free_seats = free_seats - ? * ?
            WHERE Type = ?`, [u_construct, sign, seats, sort])
            .then(() => {return true})
            .catch((err) => {console.log(err); return false})
    return ret;
}

const avail_unit_check = async (sort) => {
    let free = await db.query("SELECT free_seats FROM inventory WHERE Type = ?", sort)
    free = free[0][0]['free_seats'];
    const seats = seats_calc(sort);
    // console.log("seats =>" ,seats)
    if (free % seats === 0) {
        db.query("UPDATE inventory SET avail_units = avail_units - 1 WHERE Type = ?", sort)
        .then(() => console.log("Operation done")).catch();
    }
}



// API functions
//_________________
//list_trans - A GET method to fetch all details about transportation from database

const list_trans = async (req, res) => {
    try {
    const result = await db.query("SELECT * FROM inventory");
        res.status(200).send(result[0])
    } catch (error) {
        res.status(500).send(error)
    }
}

//reserve - A POST method used by the customer to reserve a trip
const reserve = async (req, res) => {
    const sort = req.body.sort
    try {
        let free = await db.query(`SELECT * FROM inventory WHERE Type = ?`, [sort])
        free = free[0][0].free_seats
        if (free > 0) {
            db.query(`UPDATE inventory
                    SET free_seats = free_seats - 1
                    WHERE Type = ?`, [sort]).then(result => {
                        avail_unit_check(sort)
                        res.status(200).send({"msg": "Reserved successfully"});
                    }).catch(err => {
                        return res.send(err)
                    })
            ;
        }
        else {
            return res.status(200).send({"msg": "No Free Seats"});
        }
        
    } catch (err) {
        return res.send(err);
    }
}

//edit-avail - A PATCH method used by the admin for units construction work
const edit_avail = async (req, res) => {
    // When under construction is 1, avail decreases by 1 and when it's -1 
    // avail increases by 1
    const valres = validationResult(req)
    if (!valres.isEmpty()) {
        return res.status(400).send(valres);
    }
    const sort = req.params.sort, u_construct = req.body.u_construct;
    const sign = u_construct > 0 ? 1 : (u_construct < 0 ? -1 : 0);
    try {
        const ret = await query_handler (sort, sign, u_construct)

        if (ret === true) return res.status(200).send({"msg": "Updated!"});
        else return res.status(400).send({"msg": "Please insert a valid plan"})

    } catch (err) {
        return res.status(400).send(err)
    }
}

//add_rem_units - A POST method used by the admin to add or remove units from DB.
const add_rem_units = async (req, res) => {

    const sort = req.body.sort, val = req.body.val;
    const sign = val > 0 ? 1 : (val < 0 ? -1 : 0);
    const units = (await db.query(`SELECT units FROM inventory WHERE Type = ?`, [sort]))[0][0]['units']
    const seats = seats_calc(sort)
 
    if (sign < 1 && units == 0) {
        res.status(400).send({"msg": "Inventory is alreay empty!"})
    }
    else {
        try {
            const query = await db.query(`UPDATE inventory SET units = units + ?,
                                seats = seats + ? * ?,
                                free_seats = free_seats + ? * ?,
                                avail_units = avail_units + ?
                                WHERE Type = ?`, [val, sign, seats, sign, seats, sign,  sort])
            res.send("Inventory updated successfully!")
        } catch (err) {
            console.log(err)
            res.status(400).send({msg: "Can't take it out, this unit is already in use"})
        }
    }
}

module.exports = {list_trans, reserve, edit_avail, add_rem_units}

