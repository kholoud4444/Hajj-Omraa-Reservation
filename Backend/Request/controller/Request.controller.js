const conn = require("../db/dbConnection");
const axios = require("axios")


const updateMAX = async (trip_id, type) => {
    let result;
    try {
        if (type === "hajj") {
            result = await axios.patch(`http://hajjs_service:5000/api/hajj/update/${trip_id}`)
            console.log(result);
            return 1;
        }
        if (type === "umrah") {
            result = await axios.patch(`http://omras_service:5001/api/omra/update/${trip_id}`)
            console.log(result);
            return 1;
        }
    } catch (error) {
        if (error.response) {
            // Handle error response from axios
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else {
            // Handle other errors
            console.error("Other error:", error.message);
            throw error.message;
        }
    }
};


const create = async (req, res) => {
    try {
        conn.query(`INSERT INTO appointment_requests (appointment_id, traveler_id, type)
                    VALUES (?, ?, ?)`, [req.params.appid, req.userId, req.body.type]
        );
        const result = await updateMAX(req.params.appid, req.body.type)
        if (result === 1)
            res.status(200).json({ msg: "created successfully !" });
        else 
            res.status(400).json({msg: "please enter a valid trip type!"});
    } catch (err) {
        res.status(500).json(err);
    }
    res.send();
}

const list_all = async (req, res) => {
    let result = await conn.query(`SELECT * FROM appointment_requests`)
    if (!result) {
        res.status(404).json({ msg: "appointment not found !" });
    }
    res.status(200).json(result[0]);
}

// const accept_req = async (req, res) => {
//     try {
//         const query = util.promisify(conn.query).bind(conn);
//         // UPDATE appointment_requests SET status=pending 
//         await query(
//             "UPDATE appointment_requests SET status=  'accepted' where id = ?",
//             req.params.reqid
//         );
//         const number = await query(
//             "SELECT number_of_traveler FROM appointments WHERE id=?",
//             req.params.id
//         );

//         const num = number[0].number_of_traveler;
//         const newNum = num + 1;
//         console.log(number);
//         await query(`UPDATE appointments SET number_of_traveler=${newNum}  WHERE id=?`, req.params.id);
//         res.status(200).json({
//             number
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// const decline_req = async (req, res) => {
//     try {
//         const query = util.promisify(conn.query).bind(conn);
//         // UPDATE appointment_requests SET status=pending 
//         await query(
//             "UPDATE appointment_requests SET status= 'declined' where id = ?",
//             req.params.id
//         );

//         res.status(200).json({
//             msg: "rejected successfully !",
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// const list_history = async (req, res) => { //user id
//     const query = util.promisify(conn.query).bind(conn);
//     const appointment = await query(
//         "SELECT   appointment_requests.status , appointments.name , appointments.image ,appointments.id , appointments.from_where, appointments.to_where,appointments.ticket_price, appointments.day_and_time  FROM appointment_requests join appointments WHERE appointment_requests.traveler_id= ? and appointment_requests.appointment_id=appointments.id",
//         req.params.id
//     );

//     if (!appointment) {
//         res.status(404).json({ ms: "appointment not found !" });
//     }
//     appointment.map((a) => {
//         a.image = "http://" + req.hostname + ":4000/" + a.image;

//     });
//     res.status(200).json(appointment);
// }

module.exports = { create, list_all }