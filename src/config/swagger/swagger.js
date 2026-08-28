const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description:
                "API REST para la gestión de usuarios, productos, pedidos, entregas y datos de prueba de ShipNow."
        },

        servers: [
            {
                url: "http://localhost:8080",
                description: "Servidor local"
            }
        ],

        tags: [
            {
                name: "Users",
                description: "Operaciones relacionadas con usuarios"
            },
            {
                name: "Orders",
                description: "Operaciones relacionadas con pedidos"
            },
            {
                name: "Deliveries",
                description: "Operaciones relacionadas con entregas"
            },
            {
                name: "Mocks",
                description: "Generación e inserción de datos de prueba"
            },
            {
                name: "Logger",
                description: "Herramientas de validación del sistema de logging"
            },
            {
                name: "Products",
                description: "Operaciones relacionadas con productos"
            }
        ],

        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        name: {
                            type: "string",
                            example: "Sheila"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "sheila@email.com"
                        },
                        role: {
                            type: "string",
                            example: "user"
                        }
                    }
                },

                Product: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        name: {
                            type: "string",
                            example: "Producto de prueba"
                        },
                        price: {
                            type: "number",
                            example: 1500
                        },
                        stock: {
                            type: "number",
                            example: 10
                        },
                        status: {
                            type: "string",
                            example: "available"
                        }
                    }
                },

                OrderItem: {
                    type: "object",
                    required: [
                        "product",
                        "quantity"
                    ],
                    properties: {
                        product: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        quantity: {
                            type: "integer",
                            minimum: 1,
                            example: 2
                        }
                    }
                },

                Order: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        user: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        products: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/OrderItem"
                            }
                        },
                        status: {
                            type: "string",
                            example: "pending"
                        },
                        priority: {
                            type: "string",
                            example: "medium"
                        }
                    }
                },

                Delivery: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        order: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        courier: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        status: {
                            type: "string",
                            example: "assigned"
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "error"
                        },
                        code: {
                            type: "string",
                            example: "INTERNAL_SERVER_ERROR"
                        },
                        message: {
                            type: "string",
                            example: "Error interno del servidor"
                        }
                    }
                },

                MockQuantityError: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "error"
                        },
                        code: {
                            type: "string",
                            example: "INVALID_MOCK_QUANTITY"
                        },
                        message: {
                            type: "string",
                            example:
                                "La cantidad de mocks debe ser un número entero mayor a 0"
                        }
                    }
                },

                SuccessResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Operación realizada correctamente"
                        },
                        payload: {
                            nullable: true,
                            description:
                                "Datos devueltos por la operación, cuando corresponde."
                        }
                    }
                }
            }
        }
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;