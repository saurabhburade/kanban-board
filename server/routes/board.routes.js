const router = require("express").Router();

const verifyJwt = require("../middlewares/jwt.verify");
const {
    createBoard,
    publicBoard,
    addColumn,
    addTask,
    deleteBoard,
    updateTaskMove,
    deleteTask,
} = require("../controllers/board.controllers");

//get public board
router.get("/public/:_id", publicBoard);

//create board
router.post("/create", createBoard);
//delete board
router.delete("/delete/:_id", deleteBoard);
//update board
router.post("/update/task/move", updateTaskMove);
 //add column
router.post("/add/column", addColumn);
//add column
router.post("/add/column/task", addTask);
//delete task
router.post("/delete/column/task", deleteTask);
module.exports = router;
