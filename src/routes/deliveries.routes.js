const express = require("express");

const router = express.Router();

const fileController = require("../controllers/file.controller");
const { upload } = require("../config/multer/multer.config");

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Obtener la lista de entregas
 *     description: Obtiene la lista de entregas disponibles.
 *     tags:
 *       - Deliveries
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
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Delivery"
 *
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
router.get("/", (req, res) => {
    res.json({
        status: "success",
        payload: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        status: "success",
        message: "Entrega creada"
    });
});

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
 *         description: Error al guardar el comprobante.
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
 *     description: Obtiene el identificador de una entrega utilizando su ID.
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
 *         description: Identificador de la entrega obtenido correctamente.
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f1a2b3c4d5e6f789012345"
 */
router.get("/:id", (req, res) => {
    res.json({
        status: "success",
        payload: {
            id: req.params.id
        }
    });
});

module.exports = router;