const deliveryRepository = require("../repositories/delivery.repository");

const {
    DeliveryNotFoundError
} = require("../errors/domain.errors");

class DeliveryService {
    async getAllDeliveries(page = 1, limit = 10) {
        return await deliveryRepository.getAll(page, limit);
    }

    async createDelivery(data) {
        return await deliveryRepository.create(data);
    }

    async getDeliveryById(id) {
        const delivery = await deliveryRepository.getById(id);

        if (delivery) {
            return delivery;
        }

        return {
            id
        };
    }

    async addReceipt(id, receiptData) {
        const delivery = await deliveryRepository.getById(id);

        if (!delivery) {
            throw new DeliveryNotFoundError();
        }

        return await deliveryRepository.addReceipt(
            id,
            receiptData
        );
    }
}

module.exports = new DeliveryService();