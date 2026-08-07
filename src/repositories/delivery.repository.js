const Delivery = require("../models/Delivery");

class DeliveryRepository {

    async create(data) {
        return await Delivery.create(data);
    }

    async createMany(data) {
        return await Delivery.insertMany(data);
    }

}

module.exports = new DeliveryRepository();