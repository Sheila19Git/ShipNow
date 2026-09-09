const orderRepository = require("../repositories/order.repository");

class OrderService {
  async getAllOrders(page = 1, limit = 10) {
    return await orderRepository.getAll(page, limit);
  }

  async createOrder(data) {
    return await orderRepository.create(data);
  }

  async getOrderById(id) {
    const order = await orderRepository.getById(id);

    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return order;
  }

  async updateOrder(id, data) {
    const order = await orderRepository.update(id, data);

    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return order;
  }
}

module.exports = new OrderService();