const Order = require("../models/Order");

class OrderRepository {

    async create(data) {
        return await Order.create(data);
    }

    async createMany(data) {
        return await Order.insertMany(data);
    }

    async getAll(page = 1, limit = 10) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (safePage - 1) * safeLimit;

        return await Order.find({}, "-__v")
            .skip(skip)
            .limit(safeLimit);
    }

}

module.exports = new OrderRepository();