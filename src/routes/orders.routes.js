const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener la lista de pedidos
 *     description: Obtiene la lista de pedidos disponibles.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente.
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
 *                     $ref: "#/components/schemas/Order"
 *
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Crea un pedido con los datos enviados en el cuerpo de la solicitud.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - products
 *             properties:
 *               user:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f789012345"
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/OrderItem"
 *               priority:
 *                 type: string
 *                 example: "medium"
 *     responses:
 *       201:
 *         description: Pedido creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessResponse"
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
        message: "Pedido creado correctamente"
    });
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     description: Obtiene el detalle de un pedido utilizando su ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a buscar.
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f789012345"
 *     responses:
 *       200:
 *         description: Pedido consultado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   example: {}
 */
router.get("/:id", (req, res) => {
    res.json({
        status: "success",
        payload: {}
    });
});

module.exports = router;