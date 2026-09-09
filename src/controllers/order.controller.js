const orderService = require("../services/order.service");

class OrderController {
  async getAll(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await orderService.getAllOrders(page, limit);

      res.status(200).json({
        status: "success",
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body);

      res.status(201).json({
        status: "success",
        message: "Pedido creado correctamente",
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.params.id);

      res.status(200).json({
        status: "success",
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const order = await orderService.updateOrder(
        req.params.id,
        req.body
      );

      res.status(200).json({
        status: "success",
        message: "Pedido actualizado correctamente",
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();