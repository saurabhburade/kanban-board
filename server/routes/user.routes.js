const router = require("express").Router();

const verifyJwt = require("../middlewares/jwt.verify");
const {
    login,
    register,
    fetchUser,
    updateUser,
} = require("../controllers/user.controllers");

//register user
router.post("/register", register);

// Login user
router.post("/login", login);

//jwt verification middleware
router.use(verifyJwt);

// fetch profile
router.get("/user", fetchUser);

//update profile
router.patch("/update", updateUser);
module.exports = router;
