class AppError extends Error {              //default Express error Handler
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
module.exports = AppError; 