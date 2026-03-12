const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            })
        }

        const verifyToken = token.split(" ")[1];

        const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET_KEY)

        const user = await User.findById(decoded.id)

        if (!User) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;

        next();
    }
    catch(err) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}