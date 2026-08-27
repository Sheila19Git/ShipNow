const logger = require("../config/logger");

const testLogger = (req, res) => {
    logger.debug("Mensaje de prueba nivel debug");
    logger.http("Mensaje de prueba nivel http");
    logger.info("Mensaje de prueba nivel info");
    logger.warning("Mensaje de prueba nivel warning");
    logger.error("Mensaje de prueba nivel error");
    logger.fatal("Mensaje de prueba nivel fatal");

    res.json({
        message: "Logs de prueba generados correctamente"
    });
};

module.exports = {
    testLogger
};