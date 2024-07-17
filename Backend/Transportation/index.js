const express = require('express');
const cors = require('cors');
const router = require("./routes/Transport.routes")
const app = express();

app.use(cors())
app.use(express.json())
app.use("/transportation", router)

app.listen(3001, () => console.log("Listening on port 3001"));