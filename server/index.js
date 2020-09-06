const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const User = require("./models/user.model");
const userRoutes = require("./routes/user.routes");
const boardRoutes = require("./routes/board.routes");
const {uri, dbName} = require("./configs/db.config");
console.log(uri, dbName);

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

app.use(express.json());
app.use(cors());
app.use(morgan());
//socket

io.on("connection", function (socket) {
    // console.log(changeStream);
    socket.on("connected", user => {
        console.log(user);
        socket.join(user.key, () => {
            const changeStream = User.watch();
            changeStream.on("change", change => {
                console.log(
                    change.documentKey._id,
                    user.key,
                    socket.rooms[user.key],
                    change.documentKey._id == user.key
                );
                if (change.documentKey._id == user.key) {
                    User.findOne({_id: change.documentKey._id})
                        .select("-password")
                        .select("-token")
                        .then(doc => {
                            io.to(socket.rooms[user.key]).emit(
                                "changeData",
                                doc
                            );
                        })
                        .catch(err => {
                            console.log("err", err);
                        });
                }
                // console.log("change", change);
            });
        });
    });

    // console.log("connected", client);
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);

http.listen(PORT, err => {
    if (err) throw err;
    else console.log("Connected to PORT : ", PORT);
});
