const multer = require("multer");

const ERROR_DICTIONARY = require("./error.dictionary");
const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {

    let errorCode = error.code;

    if (error instanceof multer.MulterError) {

        if (error.code === "LIMIT_FILE_SIZE") {
            errorCode = "FILE_TOO_LARGE";
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            errorCode = "INVALID_FILE_TYPE";
        }
    }

    if (error.message === "Tipo de archivo no permitido") {
        errorCode = "INVALID_FILE_TYPE";
    }

    if (error.message === "Campo de archivo no permitido") {
        errorCode = "INVALID_FILE_TYPE";
    }

    const errorData =
        ERROR_DICTIONARY[errorCode] ||
        ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;

    const code = ERROR_DICTIONARY[errorCode]
        ? errorCode
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