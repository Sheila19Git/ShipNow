const express = require("express");

const router = express.Router();

const loggerController = require("../controllers/logger.controller");

/**
 * @openapi
 * /api/logger/test:
 *   get:
 *     summary: Probar los niveles del logger
 *     description: Endpoint interno utilizado para validar que los distintos niveles de logging funcionan correctamente.
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
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Logs de prueba generados correctamente"
 */
router.get("/test", loggerController.testLogger);

module.exports = router;