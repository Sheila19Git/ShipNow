const express = require("express");

const router = express.Router();

const orderService = require("../services/order.service");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener la lista paginada de pedidos
 *     description: Obtiene una lista de pedidos utilizando paginación y un límite máximo de resultados.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número de página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad máxima de pedidos por página. Máximo 50.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
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
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 */
router.get("/", async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const orders = await orderService.getAllOrders(page, limit);

        res.json({
            status: "success",
            page,
            limit: Math.min(Math.max(limit, 1), 50),
            payload: orders
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/orders:
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
 */
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
 */
router.get("/:id", (req, res) => {
    res.json({
        status: "success",
        payload: {}
    });
});

module.exports = router;