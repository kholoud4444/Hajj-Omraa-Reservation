const jwt = require('jsonwebtoken');
const secretKey = 'secret_key'; // Same secret key used in users_service
const db = require("../db/dbConnection")

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        // db.query(`INSERT INTO users values (req.userId, req.userEmail)`).then().catch();
        next();
    });
};

module.exports = authenticateJWT;
