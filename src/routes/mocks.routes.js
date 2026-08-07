const express = require("express");

const router = express.Router();

const mockController = require("../controllers/mock.controller");


router.get("/users", mockController.getUsers);

router.get("/couriers", mockController.getCouriers);

router.get("/orders", mockController.getOrders);

router.get("/deliveries", mockController.getDeliveries);

router.post("/seed/users", mockController.seedUsers);

router.post("/seed", mockController.seedMockData);




module.exports = router;