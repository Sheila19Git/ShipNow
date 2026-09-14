const express = require("express");

const deliveryController = require("../controllers/delivery.controller");
const fileController = require("../controllers/file.controller");

const { upload } = require("../config/multer/multer.config");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Gestión de entregas
 */

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Obtener todas las entregas
 *     tags: [Deliveries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Cantidad de entregas por página
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", deliveryController.getAll);

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Crear una nueva entrega
 *     description: Crea una nueva entrega asociada a un pedido y a un repartidor.
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *               - courier
 *             properties:
 *               order:
 *                 type: string
 *                 description: ID del pedido asociado
 *                 example: 665f1a2b3c4d5e6f78901234
 *               courier:
 *                 type: string
 *                 description: ID del repartidor asignado
 *                 example: 665f1a2b3c4d5e6f78905678
 *               status:
 *                 type: string
 *                 description: Estado de la entrega
 *                 example: assigned
 *     responses:
 *       201:
 *         description: Entrega creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", deliveryController.create);

/**
 * @swagger
 * /api/deliveries/{deliveryId}/receipt:
 *   post:
 *     summary: Cargar comprobante de entrega
 *     description: Asocia un comprobante PDF o imagen a una entrega existente.
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la entrega
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - receipt
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del comprobante
 *     responses:
 *       200:
 *         description: Comprobante cargado correctamente
 *       400:
 *         description: Archivo faltante o inválido
 *       404:
 *         description: Entrega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/:deliveryId/receipt",
    upload.single("receipt"),
    fileController.uploadDeliveryReceipt
);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Obtener una entrega por ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la entrega
 *     responses:
 *       200:
 *         description: Entrega obtenida correctamente
 *       404:
 *         description: Entrega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", deliveryController.getById);

module.exports = router;