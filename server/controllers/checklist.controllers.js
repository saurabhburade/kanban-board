const {Mongoose} = require("mongoose");
const Board = require("../models/board.model");
const Checklist = require("../models/checklist.model");
const addOneCheck = (req, res) => {
    const {_id, value, checked} = req.body;
    const newCheck = {
        value,
        checked: false,
    };
    Checklist.update(
        {_id},
        {
            $push: {data: newCheck},
        }
    )
        .then(doc => {
            console.log(doc);
            if (!!doc.n) {
                res.status(200).json({message: "Success"});
            } else {
                res.status(400).json({message: "Failed to add"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Failed to add"});
        });
};

const fetchChecklist = (req, res) => {
    const {_id} = req.headers;

    Checklist.findOne({_id})
        .then(doc => {
            console.log(doc);
            if (!!doc) {
                res.status(200).json(doc);
            } else {
                res.status(400).json({message: "No Checklist Found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Failed to find Checklist"});
        });
};

const updateOneCheck = (req, res) => {
    console.log(req.body);
    const {_id, value, checked, index} = req.body;
    let selector = {};
    selector["data." + index + ".checked"] = checked;
    Checklist.update(
        {
            _id,
        },
        {
            $set: {...selector},
        }
    )
        .then(doc => {
            if (!!doc.n) {
                res.status(200).json({message: "Success"});
            } else {
                res.status(400).json({message: "Failed to update"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Failed to update"});
        });
};
const deleteOneCheck = (req, res) => {
    const {_id, value} = req.body;

    Checklist.update(
        {_id, "data.value": value},
        {
            $pull: {data: {value}},
        }
    )
        .then(doc => {
            if (!!doc.n) {
                res.status(200).json({message: "Success"});
            } else {
                res.status(400).json({message: "Failed to delete"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Failed to delete"});
        });
};
const createChecklist = (req, res) => {
    console.log(req.body);
    const {_id, columnName, index} = req.body;

    new Checklist().save((err, doc) => {
        if (err) throw err;
        let selector = {};
        selector["columns.$.tasks." + index + ".checklist"] = doc._id;
        Board.update(
            {_id, "columns.columnName": columnName},
            {
                $set: {...selector},
            }
        )
            .then(doc => {
                if (!!doc.n) {
                    res.status(200).json({message: "Success"});
                } else {
                    res.status(400).json({message: "Failed to delete"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({message: "Failed to delete"});
            });
    });
};
module.exports = {
    addOneCheck,
    createChecklist,
    fetchChecklist,
    updateOneCheck,
    deleteOneCheck,
};
