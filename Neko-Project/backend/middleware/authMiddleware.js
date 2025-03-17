const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];  // Extract token from Authorization header

    if (!token) return res.status(403).send("Access Denied");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid Token");

        req.user = user;  // Store user information in the request object
        next();  // Allow the request to move to the next middleware
    });
};

module.exports = authenticateJWT;
