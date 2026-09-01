const deliveryService = require("../services/delivery.service");

class DeliveryController {
    async getAll(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const deliveries = await deliveryService.getAllDeliveries(
                page,
                limit
            );

            res.json({
                status: "success",
                page,
                limit: Math.min(Math.max(limit, 1), 50),
                payload: deliveries
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            await deliveryService.createDelivery(req.body);

            res.status(201).json({
                status: "success",
                message: "Entrega creada"
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const delivery = await deliveryService.getDeliveryById(
                req.params.id
            );

            res.json({
                status: "success",
                payload: delivery
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DeliveryController();