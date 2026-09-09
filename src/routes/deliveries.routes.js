const express = require("express");

const router = express.Router();

const deliveryController = require("../controllers/delivery.controller");

const fileController = require("../controllers/file.controller");

const { upload } = require("../config/multer/multer.config");

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Obtener la lista de entregas
 *     description: Obtiene una lista paginada de entregas.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número de página.
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad máxima de entregas por página.
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 50
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
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Delivery"
 *       400:
 *         description: Parámetros de paginación inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/", deliveryController.getAll);

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Crear una entrega
 *     description: Crea una nueva entrega asociada a un pedido y, opcionalmente, a un repartidor.
 *     tags:
 *       - Deliveries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *             properties:
 *               order:
 *                 type: string
 *                 description: ID del pedido asociado.
 *                 example: 64f1a2b3c4d5e6f789012345
 *               courier:
 *                 type: string
 *                 description: ID del repartidor asignado.
 *                 example: 64f1a2b3c4d5e6f789012346
 *               status:
 *                 type: string
 *                 description: Estado inicial de la entrega.
 *                 example: ASSIGNED
 *     responses:
 *       201:
 *         description: Entrega creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Delivery"
 *       400:
 *         description: Datos de la entrega inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Pedido o repartidor no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/", deliveryController.create);

/**
 * @swagger
 * /api/deliveries/{deliveryId}/receipt:
 *   post:
 *     summary: Subir comprobante de entrega
 *     description: Permite cargar un comprobante asociado a una entrega existente.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         description: ID de la entrega.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
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
 *                 description: Archivo PDF, JPG o PNG de hasta 5 MB.
 *     responses:
 *       201:
 *         description: Comprobante cargado correctamente.
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
 *                   example: Comprobante cargado correctamente
 *                 delivery:
 *                   $ref: "#/components/schemas/Delivery"
 *       400:
 *         description: Archivo faltante o tipo de archivo inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Entrega no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       413:
 *         description: El archivo supera el tamaño máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
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
 *     description: Obtiene una entrega específica utilizando su ID.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entrega a consultar.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Entrega consultada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Delivery"
 *       404:
 *         description: Entrega no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/:id", deliveryController.getById);

module.exports = router;