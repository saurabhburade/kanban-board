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

        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
            unique: true,
        },
        boards: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
