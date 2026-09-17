const multer = require("multer");
const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let code = error.code || "INTERNAL_SERVER_ERROR";
    let message = error.message || "Error interno del servidor";

    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            statusCode = 413;
            code = "FILE_TOO_LARGE";
            message = "El archivo supera el tamaño máximo permitido de 5 MB";
        } else {
            statusCode = 400;
            code = error.code;
            message = "Error en la carga del archivo";
        }
    }

    if (error.code === "INVALID_FILE_TYPE") {
        statusCode = 400;
        code = "INVALID_FILE_TYPE";
        message = "Tipo de archivo no permitido";
    }

    if (error.code === "INVALID_FILE_FIELD") {
        statusCode = 400;
        code = "INVALID_FILE_FIELD";
        message = "Campo de archivo no permitido";
    }

    logger.error(message);

    res.status(statusCode).json({
        status: "error",
        code,
        message,
    });
};

module.exports = errorMiddleware;