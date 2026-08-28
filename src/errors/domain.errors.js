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

class FileRequiredError extends CustomError {
    constructor() {
        super(
            "El archivo es obligatorio",
            "FILE_REQUIRED",
            400
        );
        this.name = "FileRequiredError";
    }
}

class InvalidFileTypeError extends CustomError {
    constructor() {
        super(
            "El tipo de archivo no está permitido",
            "INVALID_FILE_TYPE",
            400
        );
        this.name = "InvalidFileTypeError";
    }
}

class FileTooLargeError extends CustomError {
    constructor() {
        super(
            "El archivo supera el tamaño máximo permitido",
            "FILE_TOO_LARGE",
            413
        );
        this.name = "FileTooLargeError";
    }
}

class InvalidDocumentTypeError extends CustomError {
    constructor() {
        super(
            "El tipo de documento no es válido",
            "INVALID_DOCUMENT_TYPE",
            400
        );
        this.name = "InvalidDocumentTypeError";
    }
}

class DeliveryNotFoundError extends CustomError {
    constructor() {
        super(
            "Entrega no encontrada",
            "DELIVERY_NOT_FOUND",
            404
        );
        this.name = "DeliveryNotFoundError";
    }
}

class FileSaveError extends CustomError {
    constructor() {
        super(
            "No se pudo guardar el archivo",
            "FILE_SAVE_ERROR",
            500
        );
        this.name = "FileSaveError";
    }
}

module.exports = {
    UserNotFoundError,
    OrderNotFoundError,
    InvalidStatusError,
    InvalidMockQuantityError,
    InvalidProductDataError,
    InvalidUserDataError,
    FileRequiredError,
    InvalidFileTypeError,
    FileTooLargeError,
    InvalidDocumentTypeError,
    DeliveryNotFoundError,
    FileSaveError
};