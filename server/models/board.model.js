const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
    {
        title: {
            type: String,
        },
        team: {
            type: Array,
            default: [],
        },
        columns: [
            {
                columnName: {
                    type: String,
                    unique: true,
                },
                tasks: [
                    {
                        title: String,
                        label: String,
                        description: String,
                        created: Date,
                    },
                ],
            },
        ],

    },
    {
        timestamps: true,
    }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
