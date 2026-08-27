const ERROR_DICTIONARY = require("./error.dictionary");
const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {
    const errorData =
        ERROR_DICTIONARY[error.code] ||
        ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;

    const code = ERROR_DICTIONARY[error.code]
        ? error.code
        : "INTERNAL_SERVER_ERROR";

    if (code === "INTERNAL_SERVER_ERROR") {
        logger.error(
            `${req.method} ${req.originalUrl} - ${error.message || "Error interno del servidor"}`
        );
    } else {
        logger.warning(
            `${req.method} ${req.originalUrl} - ${code}: ${errorData.message}`
        );
    }

    res.status(errorData.statusCode).json({
        status: "error",
        code,
        message: errorData.message
    });
};

module.exports = errorMiddleware;
