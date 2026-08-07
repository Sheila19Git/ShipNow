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


class MockService {

getMockCouriers(qty = 1) {

    return generateCouriers(Number(qty));

}


getMockOrders(qty = 1) {

    return generateOrders(Number(qty));

}


getMockDeliveries(qty = 1) {

    return generateDeliveries(Number(qty));

}
    getMockUsers(qty = 1) {
        return generateUsers(Number(qty));
    }


    async seedUsers(qty = 1) {

        const users = generateUsers(Number(qty));

        const inserted = await userRepository.createMany(users);

        return {
            insertados: inserted.length,
            coleccion: "usuarios"
        };
    }


    async seedMockData(qty = 1) {

        qty = Number(qty);


        // 1 - Usuarios normales
        const users = generateUsers(qty);

        const insertedUsers = await userRepository.createMany(users);



        // 2 - Usuarios repartidores
        const courierUsersData = generateUsers(
            qty,
            USER_ROLES.COURIER
        );

        const insertedCourierUsers =
            await userRepository.createMany(courierUsersData);



        // 3 - Crear couriers relacionados con sus usuarios
        const courierData = generateCouriers(qty);


        const couriersWithUser = courierData.map((courier, index) => ({
            ...courier,
            user: insertedCourierUsers[index]._id
        }));


        const insertedCouriers =
            await courierRepository.createMany(couriersWithUser);



        // 4 - Crear pedidos relacionados con usuarios
        const ordersData = generateOrders(qty);


        const ordersWithUser = ordersData.map((order, index) => ({
            ...order,
            user: insertedUsers[index % insertedUsers.length]._id
        }));


        const insertedOrders =
            await orderRepository.createMany(ordersWithUser);



        // 5 - Crear entregas relacionadas con pedidos y couriers
        const deliveriesData = generateDeliveries(qty);


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