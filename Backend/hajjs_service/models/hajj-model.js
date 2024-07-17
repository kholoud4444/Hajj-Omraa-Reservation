const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Hajj = new Schema(
    {
        hajjname: { type: String, required: true },
        from_where: { type: String, required: true },
        to_where: { type: String, required: true },
        ticket_price: { type: Number, required: true },
        day_and_time: { type: Date, required: true },
        max_num_trav: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('hajjs', Hajj)