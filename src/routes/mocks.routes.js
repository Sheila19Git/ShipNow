const express = require("express");

const router = express.Router();

const mockController = require("../controllers/mock.controller");

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Obtener usuarios mock
 *     description: Genera una cantidad determinada de usuarios simulados.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Usuarios mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/users", mockController.getUsers);

/**
 * @swagger
 * /api/mocks/couriers:
 *   get:
 *     summary: Obtener repartidores mock
 *     description: Genera una cantidad determinada de repartidores simulados.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de repartidores mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Repartidores mock generados correctamente.
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/couriers", mockController.getCouriers);

/**
 * @swagger
 * /api/mocks/orders:
 *   get:
 *     summary: Obtener pedidos mock
 *     description: Genera una cantidad determinada de pedidos simulados.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de pedidos mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Pedidos mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Order"
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/orders", mockController.getOrders);

/**
 * @swagger
 * /api/mocks/deliveries:
 *   get:
 *     summary: Obtener entregas mock
 *     description: Genera una cantidad determinada de entregas simuladas.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de entregas mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Entregas mock generadas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Delivery"
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/deliveries", mockController.getDeliveries);

/**
 * @swagger
 * /api/mocks/seed/users:
 *   post:
 *     summary: Insertar usuarios mock en MongoDB
 *     description: Genera e inserta usuarios simulados en la base de datos.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios a insertar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       201:
 *         description: Usuarios insertados correctamente.
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/seed/users", mockController.seedUsers);

/**
 * @swagger
 * /api/mocks/seed:
 *   post:
 *     summary: Insertar datos mock completos en MongoDB
 *     description: Genera e inserta datos simulados completos en la base de datos.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de registros a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       201:
 *         description: Datos mock insertados correctamente.
 *       400:
 *         description: Cantidad de mocks inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MockQuantityError"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/seed", mockController.seedMockData);

module.exports = router;