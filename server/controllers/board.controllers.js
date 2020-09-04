const User = require("../models/user.model");
const Board = require("../models/board.model");

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
                                        boards: board._id,
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
                const presentTask = present.tasks.find(element => {
                    return element.title === title;
                });
                
            if (!!doc && present && !presentTask) {
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
            } else {
                res.status(400).json({Error: "Already Exist"});
            }
        })
        .catch(err => {
            console.log("err", err);
        });
};
module.exports = {createBoard, publicBoard, addColumn, addTask};
