const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    const {token} = req.headers;
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
        if (err) {
            console.log(err);
            res.status(400).json({Error: "Invalid Token"});
        } else {
            next();
        }
    });
};

module.exports = verifyJwt;
