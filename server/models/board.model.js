const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
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
                    required: true,
                },
                tasks: [
                    {
                        title: String,
                        label: String,
                        description: String,
                        created: Date,
                        modified: Date,
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
