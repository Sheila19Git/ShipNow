const express = require("express");

const router = express.Router();

const mockController = require("../controllers/mock.controller");

/**
 * @openapi
 * /api/mocks/users:
 *   get:
 *     summary: Obtener usuarios mock
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios mock a generar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       200:
 *         description: Usuarios mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 */
router.get("/users", mockController.getUsers);

/**
 * @openapi
 * /api/mocks/couriers:
 *   get:
 *     summary: Obtener repartidores mock
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de repartidores mock a generar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       200:
 *         description: Repartidores mock generados correctamente
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 */
router.get("/couriers", mockController.getCouriers);

/**
 * @openapi
 * /api/mocks/orders:
 *   get:
 *     summary: Obtener pedidos mock
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de pedidos mock a generar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       200:
 *         description: Pedidos mock generados correctamente
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 */
router.get("/orders", mockController.getOrders);

/**
 * @openapi
 * /api/mocks/deliveries:
 *   get:
 *     summary: Obtener entregas mock
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de entregas mock a generar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       200:
 *         description: Entregas mock generadas correctamente
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 */
router.get("/deliveries", mockController.getDeliveries);

/**
 * @openapi
 * /api/mocks/seed/users:
 *   post:
 *     summary: Insertar usuarios mock en MongoDB
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios a insertar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       201:
 *         description: Usuarios insertados correctamente
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/seed/users", mockController.seedUsers);

/**
 * @openapi
 * /api/mocks/seed:
 *   post:
 *     summary: Insertar datos mock completos en MongoDB
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de registros a generar
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 1
 *     responses:
 *       201:
 *         description: Datos mock insertados correctamente
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/seed", mockController.seedMockData);

module.exports = router;