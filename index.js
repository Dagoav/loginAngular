const { json } = require('express');
const express = require('express');
app = express();

require("./database");

app.use(express.json());
app.use('/api', require("./routes/index"))


port = 3000
app.listen(port)

console.log("Server on port: ", port);
