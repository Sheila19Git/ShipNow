const Delivery = require("../models/Delivery");

class DeliveryRepository {

    async create(data) {
        return await Delivery.create(data);
    }

    async createMany(data) {
        return await Delivery.insertMany(data);
    }

    async getById(id) {
        return await Delivery.findById(id);
    }

    async addReceipt(id, receiptData) {
        try {
            return await Delivery.findByIdAndUpdate(
                id,
                {
                    receipt: receiptData
                },
                { new: true }
            );
        } catch (error) {
            error.code = "FILE_SAVE_ERROR";
            throw error;
        }
    }

}

module.exports = new DeliveryRepository();