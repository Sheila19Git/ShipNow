const orderService = require("../services/order.service");

class OrderController {
    async getAll(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const orders = await orderService.getAllOrders(page, limit);

            res.json({
                status: "success",
                page,
                limit: Math.min(Math.max(limit, 1), 50),
                payload: orders
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            await orderService.createOrder(req.body);

            res.status(201).json({
                status: "success",
                message: "Pedido creado correctamente"
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const order = await orderService.getOrderById(req.params.id);

            res.json({
                status: "success",
                payload: order
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new OrderController();