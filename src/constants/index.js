const USER_ROLES = Object.freeze({
    ADMIN: "ADMIN",
    USER: "USER",
    COURIER: "COURIER"
});

const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: "AVAILABLE",
    OUT_OF_STOCK: "OUT_OF_STOCK"
});

const ORDER_STATUS = Object.freeze({
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    PREPARING: "PREPARING",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED"
});

const ORDER_PRIORITY = Object.freeze({
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
});

const DELIVERY_STATUS = Object.freeze({
    ASSIGNED: "ASSIGNED",
    IN_TRANSIT: "IN_TRANSIT",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
});

const DOCUMENT_TYPES = Object.freeze({
    DNI: "DNI",
    LICENCIA: "LICENCIA",
    OTRO: "OTRO"
});

module.exports = {
    USER_ROLES,
    PRODUCT_STATUS,
    ORDER_STATUS,
    ORDER_PRIORITY,
    DELIVERY_STATUS,
    DOCUMENT_TYPES
};