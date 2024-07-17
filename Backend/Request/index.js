const express = require('express');
const cors = require('cors');
const router = require("./routes/Request.routes")
const app = express();

app.use(cors())
app.use(express.json())
app.use("/request", router)

app.listen(3002, () => console.log("Listening on port 3002"));