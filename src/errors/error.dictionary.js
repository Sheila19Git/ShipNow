const ERROR_DICTIONARY = Object.freeze({

    USER_NOT_FOUND: {
        statusCode: 404,
        message: "Usuario no encontrado"
    },

    ORDER_NOT_FOUND: {
        statusCode: 404,
        message: "Pedido no encontrado"
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

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno del servidor"
    }

});

module.exports = ERROR_DICTIONARY;