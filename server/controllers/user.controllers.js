const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
    const {fname, lname, email, password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const token = jwt.sign(email, process.env.JWT_SECRET);
    User.findOne({email})
        .then(doc => {
            if (doc) {
                res.status(400).json({Error: "Already Exist"});
            } else {
                const newUser = new User({
                    fname,
                    lname,
                    token,
                    email,
                    password: hash,
                    chats: [],
                });
                newUser
                    .save()
                    .then(user => {
                        user.password = "";
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    });
            }
        })
        .catch(err => {
            console.log("err", err);
            res.status(400).json(err);
        });
};

const login = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .then(doc => {
            if (doc) {
                const match = bcrypt.compareSync(password, doc.password);
                if (match) {
                    doc.password = "";
                    res.status(200).json(doc);
                } else {
                    res.status(400).json({Error: "Incorrect Password"});
                }
            } else {
                res.status(404).json({Error: "User Not Found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({Error: "Something went wrong"});
        });
};
const fetchUser = (req, res) => {
    const {token} = req.headers;
    User.findOne({token})
        .then(doc => {
            if (doc) {
                doc.password = "";
                res.status(200).json(doc);
            } else {
                res.status(404).json({Error: "User Not Found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({Error: "Something went wrong"});
        });
};
const updateUser = (req, res) => {
    console.log(req.body);
    const {token} = req.headers;
    const {
        fname,
        lname,
        password = "",
        newPassword = "",
        currentPassword,
    } = req.body;

    User.findOne({token}, (err, result) => {
        if (err) res.status(400).json({message: "Invalid User"});

        if (!!result) {
            if (!!newPassword && newPassword.trim()) {
                const match = bcrypt.compareSync(
                    currentPassword,
                    result.password
                );
                if (match) {
                    const hash = bcrypt.hashSync(newPassword, 10);

                    User.updateOne(
                        {token},
                        {
                            $set: {
                                password: hash,
                                fname,
                                lname,
                            },
                        },
                        (err, raw) => {
                            if (err) {
                                res.status(400).json({
                                    Error: "Failed to update",
                                });
                            }
                            res.status(200).json({
                                Message: "Success !",
                            });
                        }
                    );
                } else {
                    res.status(400).json({Error: "Incorrect Password"});
                }
            } else {
                const match = bcrypt.compareSync(password, result.password);
                if (match) {
                    User.updateOne(
                        {token},
                        {
                            $set: {
                                fname,
                                lname,
                            },
                        },
                        (err, raw) => {
                            if (err) {
                                res.status(400).json({
                                    Error: "Failed to update",
                                });
                            }
                            res.status(200).json({
                                Message: "Success !",
                            });
                        }
                    );
                } else {
                    res.status(400).json({Error: "Incorrect Password"});
                }
            }
        }
    });
    if (!!newPassword.trim()) {
    }
};

module.exports = {register, login, fetchUser, updateUser};
