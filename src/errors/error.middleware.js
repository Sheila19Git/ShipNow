const ERROR_DICTIONARY = require("./error.dictionary");

const errorMiddleware = (error, req, res, next) => {
    const errorData =
        ERROR_DICTIONARY[error.code] ||
        ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;

    const code = ERROR_DICTIONARY[error.code]
        ? error.code
        : "INTERNAL_SERVER_ERROR";

    res.status(errorData.statusCode).json({
        status: "error",
        code,
        message: errorData.message
    });
};

module.exports = errorMiddleware;