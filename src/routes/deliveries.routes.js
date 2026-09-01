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
 */
router.get("/", deliveryController.getAll);

/**
 * @swagger
 * /api/deliveries:
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
 *       400:
 *         description: Archivo faltante o tipo de archivo inválido.
 *       404:
 *         description: Entrega no encontrada.
 *       413:
 *         description: El archivo supera el tamaño máximo permitido.
 *       500:
 *         description: Error al guardar el comprobante.
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
 *     description: Obtiene una entrega utilizando su ID.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entrega a consultar.
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f789012345"
 *     responses:
 *       200:
 *         description: Entrega consultada correctamente.
 */
router.get("/:id", deliveryController.getById);

module.exports = router;