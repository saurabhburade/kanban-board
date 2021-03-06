const User = require("../models/user.model");
const Board = require("../models/board.model");
const mongoose = require("mongoose");
const Checklist = require("../models/checklist.model");

const createBoard = (req, res) => {
    const {title, owner} = req.body;
    if (!!title) {
        Board.find({owner})
            .then(docs => {
                console.log("doc", docs);
                const present = docs.find(element => {
                    return element.title === title;
                });
                if (!docs || !present) {
                    const newBoard = new Board({
                        title,
                        owner,
                    });
                    newBoard
                        .save()
                        .then(board => {
                            User.update(
                                {email: owner},
                                {
                                    $push: {
                                        boards: {_id: board._id, title},
                                    },
                                }
                            )
                                .then(doc => {
                                    res.status(200).json(board);
                                })
                                .catch(err =>
                                    res
                                        .status(400)
                                        .json({Error: "Something went wrong"})
                                );
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json(err);
                        });
                } else {
                    res.status(400).json({Error: "Already Exist"});
                }
            })
            .catch(err => {
                console.log("err", err);
            });
    }
};

const deleteBoard = (req, res) => {
    console.log("req.body, req.headers, req.params, req.data");
    const {token} = req.headers;
    const {_id} = req.params;
    console.log(typeof _id, mongoose.Types.ObjectId(_id));
    User.findOneAndUpdate(
        {token},
        {$pull: {boards: {_id: mongoose.Types.ObjectId(_id)}}}
    )
        .select("-password")
        .select("-token")
        .then(user => {
            console.log("user", user);
            if (!!user) {
                console.log(user);
                Board.findOneAndDelete({_id, owner: user.email})
                    .then(doc => {
                        res.status(200).json({message: "success"});
                    })
                    .catch(err => {
                        console.log("err", err);
                        res.status(400).json(err);
                    });
            } else {
                res.status(400).json({
                    Error: "Something went wrong",
                });
            }
        })
        .catch(err => {
            console.log("err", err);
            res.status(400).json(err);
        });
};
const publicBoard = (req, res) => {
    const {_id} = req.params;
    if (!!_id) {
        Board.findOne({_id})
            .then(doc => {
                console.log("doc", doc);
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log("err", err);
                res.status(400).json(err);
            });
    }
};

const addColumn = (req, res) => {
    const {_id, columnName} = req.body;
    console.log(req.body);
    Board.findOne({_id})
        .then(doc => {
            console.log(doc);
            const present =
                doc &&
                doc.columns.find(element => {
                    return element.columnName === columnName;
                });
            if (!!doc && !present) {
                Board.update(
                    {_id},
                    {
                        $push: {
                            columns: {
                                columnName,
                                tasks: [],
                            },
                        },
                    }
                )
                    .then(doc => {
                        res.status(200).json(doc);
                    })
                    .catch(err =>
                        res.status(400).json({
                            Error: "Something went wrong",
                        })
                    );
            } else {
                res.status(400).json({Error: "Already Exist"});
            }
        })
        .catch(err => {
            console.log("err", err);
        });
};
const addTask = (req, res) => {
    const {_id, title, label, description, columnName} = req.body;
    console.log(req.body);
    Board.findOne({_id})
        .then(doc => {
            console.log(doc);
            const present =
                doc &&
                doc.columns.find(element => {
                    return element.columnName === columnName;
                });
            // console.log("present",present);
            const presentTask =
                present &&
                present.tasks &&
                present.tasks.find(element => {
                    return element.title === title;
                });

            if (!!doc && present && !presentTask) {
                new Checklist().save((err, doc) => {
                    Board.update(
                        {_id, "columns.columnName": columnName},
                        {
                            $push: {
                                "columns.$.tasks": {
                                    title,
                                    label,
                                    description,
                                    created: new Date(),
                                    modified: new Date(),
                                    checklist: doc._id,
                                },
                            },
                        }
                    )
                        .then(doc => {
                            res.status(200).json(doc);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({
                                Error: "Something went wrong",
                            });
                        });
                });
            } else {
                res.status(400).json({Error: "Already Exist"});
            }
        })
        .catch(err => {
            console.log("err", err);
        });
};
const updateTaskMove = (req, res) => {
    console.log(req.body);
    const {_id, columns} = req.body;

    Board.update(
        {_id},
        {
            $set: {
                columns,
            },
        }
    )
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                Error: "Something went wrong",
            });
        });
};
const deleteTask = (req, res) => {
    console.log(req.body);
    const {_id, columnName, tasks} = req.body;
    Board.updateOne(
        {_id, "columns.columnName": columnName},
        {$set: {"columns.$.tasks": tasks}}
    )
        .then(doc => {
            console.log("docxx", doc);
            res.status(200).json({message: "success"});
        })
        .catch(err => {
            console.log("errxx", err);
            res.status(400).json({message: "failed"});
        });
};
const updateColumnDetails = (req, res) => {
    console.log("object", req.body);
    const {_id, columnName, newColumnName} = req.body;
    Board.updateOne(
        {_id, "columns.columnName": columnName},
        {$set: {"columns.$.columnName": newColumnName}}
    )
        .then(doc => {
            console.log("docxx", doc);
            res.status(200).json({message: "success"});
        })
        .catch(err => {
            console.log("errxx", err);
            res.status(400).json({message: "failed"});
        });
};

module.exports = {
    createBoard,
    deleteBoard,
    publicBoard,
    addColumn,
    addTask,
    updateTaskMove,
    deleteTask,
    updateColumnDetails,
};
