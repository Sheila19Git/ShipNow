const orderRepository = require("../repositories/order.repository");

class OrderService {

    async getAllOrders(page = 1, limit = 10) {
        return await orderRepository.getAll(page, limit);
    }

}

module.exports = new OrderService();