const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

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
router.get("/", orderController.getAll);

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
router.post("/", orderController.create);

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
 *       404:
 *         description: Pedido no encontrado.
 */
router.get("/:id", orderController.getById);

module.exports = router;