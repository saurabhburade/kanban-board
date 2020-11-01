const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checklistSchema = new Schema(
    {
        data: []
    },
    {
        timestamps: true,
    }
);

const Checklist = mongoose.model("Checklist", checklistSchema);
module.exports = Checklist;
