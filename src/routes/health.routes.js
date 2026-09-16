const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar el estado de la API
 *     description: Devuelve el estado actual del servidor, el entorno de ejecución y el tiempo activo.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
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
 *                   example: Health check OK
 *                 environment:
 *                   type: string
 *                   example: development
 *                 uptime:
 *                   type: number
 *                   example: 125.456
 */
router.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Health check OK",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime(),
    });
});

module.exports = router;