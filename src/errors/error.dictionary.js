const ERROR_DICTIONARY = Object.freeze({

    USER_NOT_FOUND: {
        statusCode: 404,
        message: "Usuario no encontrado"
    },

    ORDER_NOT_FOUND: {
        statusCode: 404,
        message: "Pedido no encontrado"
    },

    DELIVERY_NOT_FOUND: {
        statusCode: 404,
        message: "Entrega no encontrada"
    },

    INVALID_STATUS: {
        statusCode: 400,
        message: "Estado inválido"
    },

    INVALID_MOCK_QUANTITY: {
        statusCode: 400,
        message: "La cantidad de mocks debe ser un número entero mayor a 0"
    },

    INVALID_PRODUCT_DATA: {
        statusCode: 400,
        message: "El nombre y el precio son obligatorios"
    },

    INVALID_USER_DATA: {
        statusCode: 400,
        message: "El nombre y el email son obligatorios"
    },

    FILE_REQUIRED: {
        statusCode: 400,
        message: "El archivo es obligatorio"
    },

    INVALID_FILE_TYPE: {
        statusCode: 400,
        message: "El tipo de archivo no está permitido"
    },

    INVALID_FILE_FIELD: {
        statusCode: 400,
        message: "El campo del archivo no es válido"
    },

    FILE_TOO_LARGE: {
        statusCode: 413,
        message: "El archivo supera el tamaño máximo permitido"
    },

    INVALID_DOCUMENT_TYPE: {
        statusCode: 400,
        message: "El tipo de documento no es válido"
    },

    FILE_SAVE_ERROR: {
        statusCode: 500,
        message: "No se pudo guardar el archivo"
    },

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno del servidor"
    }

});

module.exports = ERROR_DICTIONARY;