const Checklist = require("../models/checklist.model");
const addOneCheck = (req, res) => {
    const {_id, value, checked} = req.body;
    const newCheck = {
        value,
        checked,
    };
    Checklist.findOneAndUpdate(
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

const updateOneCheck = (req, res) => {
    console.log(req.body);
    const {_id, value, checked} = req.body;

    Checklist.update(
        {_id, "data.value": value},
        {
            $set: {"data.$.checked": checked},
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
module.exports = {addOneCheck, updateOneCheck, deleteOneCheck};
