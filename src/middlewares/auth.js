const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');
const { FAIL } = require('../utils/responseStatus');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        const error = new AppError(FAIL, 401, 'Access denied. No token provided!');
        return next(error);
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECURITY_KEY);
        req.user = decodedUser;
        next();
    }
    catch(err) {
        const error = new AppError(FAIL, 401, 'Invalid Token, Authorization failed!');
        return next(error);
    }
}


module.exports = auth;
