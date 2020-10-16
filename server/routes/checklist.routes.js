const router = require("express").Router();
const verifyJwt = require("../middlewares/jwt.verify");
const {
   addOneCheck,
   updateOneCheck,
   deleteOneCheck
} = require("../controllers/checklist.controllers");
//jwt verification middleware
router.use(verifyJwt);
//Add single check to the checklist
router.post("/add", addOneCheck);
//Update single check at checklist
router.patch("/update", updateOneCheck);
//delete one check in the checklist
router.post("/delete", deleteOneCheck);
module.exports = router;