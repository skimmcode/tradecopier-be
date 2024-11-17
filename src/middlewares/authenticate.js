const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
require('dotenv').config();

const authenticate = (req, res, next) => {
    // Get the token from the request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    logger.info(`Token: ${token}`);
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is found
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if the token is invalid
        }
        req.user = user;
        next(); // Pass the execution off to the next middleware or route handler
    });
};

module.exports = authenticate; 