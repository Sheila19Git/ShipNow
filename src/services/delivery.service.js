const deliveryRepository = require("../repositories/delivery.repository");

const {
    DeliveryNotFoundError
} = require("../errors/domain.errors");

class DeliveryService {

    async getDeliveryById(id) {
        const delivery = await deliveryRepository.getById(id);

        if (!delivery) {
            throw new DeliveryNotFoundError();
        }

        return delivery;
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