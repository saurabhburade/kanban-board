const router = require("express").Router();

const verifyJwt = require("../middlewares/jwt.verify");
const {
    login,
    register,
    fetchUser,
} = require("../controllers/user.controllers");

//register user
router.post("/register", register);

// Login user
router.post("/login", login);

//jwt verification middleware
router.use(verifyJwt);

// fetch profile
router.get("/user", fetchUser);

module.exports = router;
