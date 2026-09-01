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

        if (order) {
            return order;
        }

        return {
            id
        };
    }
}

module.exports = new OrderService();