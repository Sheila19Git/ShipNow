const { faker } = require("@faker-js/faker");
const {
    USER_ROLES,
    ORDER_STATUS,
    ORDER_PRIORITY,
    DELIVERY_STATUS
} = require("../constants");

const generateUser = (role = USER_ROLES.USER) => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    role
});

const generateUsers = (qty = 1, role = USER_ROLES.USER) => {
    return Array.from({ length: qty }, () => generateUser(role));
};


const generateCourier = () => ({
    available: faker.datatype.boolean()
});

const generateCouriers = (qty = 1) => {
    return Array.from({ length: qty }, generateCourier);
};


const generateOrder = () => ({
    products: [],
    status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
    priority: faker.helpers.arrayElement(Object.values(ORDER_PRIORITY))
});

const generateOrders = (qty = 1) => {
    return Array.from({ length: qty }, generateOrder);
};

const generateDelivery = () => ({
    status: faker.helpers.arrayElement(Object.values(DELIVERY_STATUS))
});

const generateDeliveries = (qty = 1) => {
    return Array.from({ length: qty }, generateDelivery);
};

module.exports = {
    generateUser,
    generateUsers,
    generateCourier,
    generateCouriers,
    generateOrder,
    generateOrders,
    generateDelivery,
    generateDeliveries
};