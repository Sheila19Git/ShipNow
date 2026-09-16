const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  logger.error(error.message || "Error interno del servidor");

  res.status(statusCode).json({
    status: "error",
    code: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message || "Error interno del servidor",
  });
};

module.exports = errorMiddleware;