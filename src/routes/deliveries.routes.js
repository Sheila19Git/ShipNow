const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/deliveries:
 *   get:
 *     summary: Obtener la lista de entregas
 *     tags:
 *       - Deliveries
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida exitosamente
 *   post:
 *     summary: Crear/asignar una entrega
 *     tags:
 *       - Deliveries
 *     responses:
 *       201:
 *         description: Entrega creada exitosamente
 */
router.get("/", (req, res) => {
  res.json({ status: "success", payload: [] });
});

router.post("/", (req, res) => {
  res.status(201).json({ status: "success", message: "Entrega creada" });
});

/**
 * @openapi
 * /api/deliveries/{id}:
 *   get:
 *     summary: Obtener detalle de una entrega por ID
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la entrega obtenido exitosamente
 */
router.get("/:id", (req, res) => {
  res.json({ status: "success", payload: { id: req.params.id } });
});

module.exports = router;