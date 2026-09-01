const Delivery = require("../models/Delivery");

class DeliveryRepository {

    async create(data) {
        return await Delivery.create(data);
    }

    async createMany(data) {
        return await Delivery.insertMany(data);
    }

    async getAll(page = 1, limit = 10) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (safePage - 1) * safeLimit;

        return await Delivery.find({}, "-__v")
            .skip(skip)
            .limit(safeLimit);
    }

    async getById(id) {
        return await Delivery.findById(id);
    }

    async addReceipt(id, receiptData) {
        try {
          return await Delivery.findByIdAndUpdate
        (
         id,
        { receipt: receiptData },
     { returnDocument: "after" }
        );
        } catch (error) {
            error.code = "FILE_SAVE_ERROR";
            throw error;
        }
    }

}

module.exports = new DeliveryRepository();