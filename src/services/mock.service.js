const {
    generateUsers,
    generateCouriers,
    generateOrders,
    generateDeliveries
} = require("../utils/mock.generator");

const { USER_ROLES } = require("../constants");

const userRepository = require("../repositories/user.repository");
const courierRepository = require("../repositories/courier.repository");
const orderRepository = require("../repositories/order.repository");
const deliveryRepository = require("../repositories/delivery.repository");

const { InvalidMockQuantityError } = require("../errors/domain.errors");

class MockService {

    validateQuantity(qty) {
        const quantity = Number(qty);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new InvalidMockQuantityError();
        }

        return quantity;
    }

    getMockCouriers(qty = 1) {
        const quantity = this.validateQuantity(qty);
        return generateCouriers(quantity);
    }

    getMockOrders(qty = 1) {
        const quantity = this.validateQuantity(qty);
        return generateOrders(quantity);
    }

    getMockDeliveries(qty = 1) {
        const quantity = this.validateQuantity(qty);
        return generateDeliveries(quantity);
    }

    getMockUsers(qty = 1) {
        const quantity = this.validateQuantity(qty);
        return generateUsers(quantity);
    }

    async seedUsers(qty = 1) {
        const quantity = this.validateQuantity(qty);

        const users = generateUsers(quantity);
        const inserted = await userRepository.createMany(users);

        return {
            insertados: inserted.length,
            coleccion: "usuarios"
        };
    }

    async seedMockData(qty = 1) {
        const quantity = this.validateQuantity(qty);

        const users = generateUsers(quantity);
        const insertedUsers = await userRepository.createMany(users);

        const courierUsersData = generateUsers(
            quantity,
            USER_ROLES.COURIER
        );

        const insertedCourierUsers =
            await userRepository.createMany(courierUsersData);

        const courierData = generateCouriers(quantity);

        const couriersWithUser = courierData.map((courier, index) => ({
            ...courier,
            user: insertedCourierUsers[index]._id
        }));

        const insertedCouriers =
            await courierRepository.createMany(couriersWithUser);

        const ordersData = generateOrders(quantity);

        const ordersWithUser = ordersData.map((order, index) => ({
            ...order,
            user: insertedUsers[index % insertedUsers.length]._id
        }));

        const insertedOrders =
            await orderRepository.createMany(ordersWithUser);

        const deliveriesData = generateDeliveries(quantity);

        const deliveriesWithRelations =
            deliveriesData.map((delivery, index) => ({
                ...delivery,
                order: insertedOrders[index % insertedOrders.length]._id,
                courier: insertedCouriers[index % insertedCouriers.length]._id
            }));

        const insertedDeliveries =
            await deliveryRepository.createMany(deliveriesWithRelations);

        return {
            usuarios: insertedUsers.length,
            repartidores: insertedCouriers.length,
            pedidos: insertedOrders.length,
            entregas: insertedDeliveries.length
        };
    }
}

module.exports = new MockService();