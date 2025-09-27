const AppError = require("../utils/AppError");
const { FAIL } = require("../utils/responseStatus");

const isAdmin = (req, res, next) => {
    const user = req.user;
    if(!user) {
        const err = new AppError(FAIL, 403, 'No User provided');
        return next(err);
    }


    if(user.role !== 'admin') {
        const err = new AppError(FAIL, 403, 'You don\'t have access to this resource');
        return next(err);
    }

    next();
}

module.exports = isAdmin;