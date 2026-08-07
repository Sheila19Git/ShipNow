const Courier = require("../models/Courier");

class CourierRepository {

    async create(data) {
        return await Courier.create(data);
    }

    async createMany(data) {
        return await Courier.insertMany(data);
    }

}

module.exports = new CourierRepository();