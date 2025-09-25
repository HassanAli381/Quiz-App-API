class AppError extends Error {
    constructor(status, statusCode, msg) {
        super(msg);
        this.msg = msg;
        this.status = status;
        this.statusCode = statusCode;
    }

}

module.exports = AppError;