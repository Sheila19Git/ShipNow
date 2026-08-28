const express = require("express");

const router = express.Router();

const loggerController = require("../controllers/logger.controller");

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     summary: Probar los niveles del logger
 *     description: Endpoint de validación utilizado para comprobar que los distintos niveles del sistema de logging funcionan correctamente. No representa una funcionalidad de negocio.
 *     tags:
 *       - Logger
 *     responses:
 *       200:
 *         description: Logs de prueba generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Logs de prueba generados correctamente
 */

router.get("/test", loggerController.testLogger);

module.exports = router;