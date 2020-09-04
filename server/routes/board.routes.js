const router = require("express").Router();

const verifyJwt = require("../middlewares/jwt.verify");
const {
    createBoard,
    publicBoard,
    addColumn,
    addTask,
} = require("../controllers/board.controllers");

//get public board
router.get("/public/:_id", publicBoard);

//create board
router.post("/create", createBoard);
 //add column
router.post("/add/column", addColumn);
//add column
router.post("/add/column/task", addTask);
module.exports = router;
