const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Obtener la lista de entregas
 *     description: Obtiene la lista de entregas disponibles.
 *     tags:
 *       - Deliveries
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Delivery"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   post:
 *     summary: Crear o asignar una entrega
 *     description: Crea una nueva entrega.
 *     tags:
 *       - Deliveries
 *     responses:
 *       201:
 *         description: Entrega creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessResponse"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/", (req, res) => {
    res.json({
        status: "success",
        payload: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        status: "success",
        message: "Entrega creada"
    });
});

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Obtener una entrega por ID
 *     description: Obtiene el detalle de una entrega utilizando su ID.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entrega a buscar.
 *         schema:
 *           type: string
 *         example: "64f1a2b3c4d5e6f789012345"
 *     responses:
 *       200:
 *         description: Entrega obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: "#/components/schemas/Delivery"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/:id", (req, res) => {
    res.json({
        status: "success",
        payload: {
            id: req.params.id
        }
    });
});

module.exports = router;