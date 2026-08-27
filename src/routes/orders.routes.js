const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Obtener la lista de pedidos
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   post:
 *     summary: Crear un nuevo pedido
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
 *                   $ref: '#/components/schemas/OrderItem'
 *               priority:
 *                 type: string
 *                 example: "medium"
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos enviados en la petición
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res) => {
    res.json({ status: "success", payload: [] });
});

router.post("/", (req, res) => {
    res.status(201).json({ status: "success", message: "Pedido creado correctamente" });
});

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a buscar
 *     responses:
 *       200:
 *         description: Detalle del pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", (req, res) => {
    res.json({ status: "success", payload: {} });
});

module.exports = router;