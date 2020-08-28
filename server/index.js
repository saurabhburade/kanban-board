const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {uri, dbName} = require("./configs/db.config");
console.log(uri,dbName)
mongoose.connect(uri, {useUnifiedTopology: true, dbName}, err => {
    if (err) {
        console.log("Mongoose conection error", err);
    } else {
        console.log("Mongoose conection : connected 🔥");
    }
});
app.use(express.json());
app.use(cors());
app.use(morgan());

app.listen(PORT, err => {
    if (err) throw err;
    else console.log("Connected to PORT : ", PORT);
});
