const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const User=require('./models/user.model');
const userRoutes = require("./routes/user.routes");
const boardRoutes = require("./routes/board.routes");
const {uri, dbName} = require("./configs/db.config");
console.log(uri,dbName)

mongoose.connect(
    uri,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName,
        replicaSet: "rs0",
    },
    err => {
        if (err) {
            console.log("Mongoose conection error", err);
        } else {
            console.log("Mongoose conection : connected 🔥");
        }
    }
);
const changeStream = User.watch();
console.log(changeStream)
changeStream.on("change", change => {
    console.log("change",change); 
    io.emit('changeData',change)
});
io.on("connection", function () {
    console.log("connected");
});

app.use(express.json());
app.use(cors());
app.use(morgan());
// API routes
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);


http.listen(PORT, err => {
    if (err) throw err;
    else console.log("Connected to PORT : ", PORT);
});
