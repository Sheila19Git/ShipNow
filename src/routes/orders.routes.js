const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener todos los pedidos
 *     description: Obtiene la lista de todos los pedidos registrados.
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", orderController.getAll);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear un pedido
 *     description: Crea un nuevo pedido asociado a un usuario y productos.
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
 *                 description: ID del usuario que realiza el pedido.
 *                 example: 64f1a2b3c4d5e6f789012345
 *               products:
 *                 type: array
 *                 description: Productos incluidos en el pedido.
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               status:
 *                 type: string
 *                 description: Estado inicial del pedido.
 *                 example: PENDING
 *               priority:
 *                 type: string
 *                 description: Prioridad del pedido.
 *                 example: MEDIUM
 *     responses:
 *       201:
 *         description: Pedido creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos del pedido inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INVALID_ORDER_DATA
 *               message: Los datos del pedido son inválidos
 *       404:
 *         description: Usuario o recurso relacionado no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_RESOURCE_NOT_FOUND
 *               message: Usuario o recurso relacionado no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", orderController.create);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener un pedido por ID
 *     description: Obtiene un pedido específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Pedido encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_NOT_FOUND
 *               message: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", orderController.getById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Actualizar un pedido
 *     description: Actualiza un pedido existente utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nuevo estado del pedido.
 *                 example: IN_PROGRESS
 *               priority:
 *                 type: string
 *                 description: Nueva prioridad del pedido.
 *                 example: HIGH
 *               products:
 *                 type: array
 *                 description: Productos del pedido.
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos o estado del pedido inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INVALID_ORDER_DATA
 *               message: Los datos o el estado del pedido son inválidos
 *       404:
 *         description: Pedido no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_NOT_FOUND
 *               message: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", orderController.update);

module.exports = router;