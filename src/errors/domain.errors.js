const CustomError = require("./custom.error");

class UserNotFoundError extends CustomError {
    constructor() {
        super(
            "Usuario no encontrado",
            "USER_NOT_FOUND",
            404
        );
        this.name = "UserNotFoundError";
    }
}

class OrderNotFoundError extends CustomError {
    constructor() {
        super(
            "Pedido no encontrado",
            "ORDER_NOT_FOUND",
            404
        );
        this.name = "OrderNotFoundError";
    }
}

class InvalidStatusError extends CustomError {
    constructor() {
        super(
            "Estado inválido",
            "INVALID_STATUS",
            400
        );
        this.name = "InvalidStatusError";
    }
}

class InvalidMockQuantityError extends CustomError {
    constructor() {
        super(
            "La cantidad de mocks debe ser un número entero mayor a 0",
            "INVALID_MOCK_QUANTITY",
            400
        );
        this.name = "InvalidMockQuantityError";
    }
}

class InvalidProductDataError extends CustomError {
    constructor() {
        super(
            "El nombre y el precio son obligatorios",
            "INVALID_PRODUCT_DATA",
            400
        );
        this.name = "InvalidProductDataError";
    }
}

class InvalidUserDataError extends CustomError {
    constructor() {
        super(
            "El nombre y el email son obligatorios",
            "INVALID_USER_DATA",
            400
        );
        this.name = "InvalidUserDataError";
    }
}

module.exports = {
    UserNotFoundError,
    OrderNotFoundError,
    InvalidStatusError,
    InvalidMockQuantityError,
    InvalidProductDataError,
    InvalidUserDataError
};