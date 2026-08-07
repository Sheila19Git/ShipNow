const Order = require("../models/Order");

class OrderRepository {

    async create(data) {
        return await Order.create(data);
    }

    async createMany(data) {
        return await Order.insertMany(data);
    }

}

module.exports = new OrderRepository();