const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

// Obtener todos los pedidos
router.get("/", orderController.getAll);

// Crear un pedido
router.post("/", orderController.create);

// Obtener un pedido por ID
router.get("/:id", orderController.getById);

// Actualizar un pedido
router.put("/:id", orderController.update);

module.exports = router;