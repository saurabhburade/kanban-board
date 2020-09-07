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
        
        columns: {
            type:Array,
            default:[]
        }
    },
    {
        timestamps: true,
    }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
