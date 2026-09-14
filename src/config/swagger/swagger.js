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
                name: "Products",
                description: "Operaciones relacionadas con productos"
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
                name: "Health",
                description: "Estado y disponibilidad de la API"
            }
        ],

        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["name", "email", "role"],
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
                            enum: ["USER", "ADMIN"],
                            example: "USER"
                        },
                        documents: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "dni.pdf"
                                    },
                                    reference: {
                                        type: "string",
                                        example: "uploads/users/dni.pdf"
                                    },
                                    mimetype: {
                                        type: "string",
                                        example: "application/pdf"
                                    },
                                    size: {
                                        type: "integer",
                                        example: 245678
                                    }
                                }
                            }
                        }
                    }
                },

                Product: {
                    type: "object",
                    required: ["name", "price", "stock", "status"],
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
                            type: "integer",
                            example: 10
                        },
                        status: {
                            type: "string",
                            enum: ["AVAILABLE", "UNAVAILABLE"],
                            example: "AVAILABLE"
                        }
                    }
                },

                OrderItem: {
                    type: "object",
                    required: ["product", "quantity"],
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
                    required: ["user", "products", "status", "priority"],
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
                            minItems: 1,
                            items: {
                                $ref: "#/components/schemas/OrderItem"
                            }
                        },
                        status: {
                            type: "string",
                            enum: [
                                "PENDING",
                                "PROCESSING",
                                "SHIPPED",
                                "DELIVERED",
                                "CANCELLED"
                            ],
                            example: "PENDING"
                        },
                        priority: {
                            type: "string",
                            enum: ["LOW", "MEDIUM", "HIGH"],
                            example: "MEDIUM"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-09-14T12:00:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-09-14T12:30:00.000Z"
                        }
                    }
                },

                Courier: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f1a2b3c4d5e6f789012345"
                        },
                        name: {
                            type: "string",
                            example: "Juan Pérez"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "juan@email.com"
                        },
                        phone: {
                            type: "string",
                            example: "+54 9 351 5555555"
                        },
                        status: {
                            type: "string",
                            enum: ["AVAILABLE", "BUSY", "INACTIVE"],
                            example: "AVAILABLE"
                        }
                    }
                },

                DeliveryReceipt: {
                    type: "object",
                    properties: {
                        filename: {
                            type: "string",
                            example: "comprobante.png"
                        },
                        originalname: {
                            type: "string",
                            example: "comprobante-entrega.png"
                        },
                        path: {
                            type: "string",
                            example: "uploads/deliveries/comprobante.png"
                        },
                        mimetype: {
                            type: "string",
                            example: "image/png"
                        },
                        size: {
                            type: "integer",
                            example: 245678
                        },
                        uploadedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-09-14T13:00:00.000Z"
                        }
                    }
                },

                Delivery: {
                    type: "object",
                    required: ["order", "courier", "status"],
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
                            enum: [
                                "PENDING",
                                "ASSIGNED",
                                "IN_TRANSIT",
                                "DELIVERED",
                                "FAILED",
                                "CANCELLED"
                            ],
                            example: "ASSIGNED"
                        },
                        trackingNumber: {
                            type: "string",
                            example: "SN-2026-000123"
                        },
                        assignedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-09-14T12:00:00.000Z"
                        },
                        pickedUpAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                            example: "2026-09-14T12:30:00.000Z"
                        },
                        deliveredAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                            example: "2026-09-14T14:00:00.000Z"
                        },
                        receipt: {
                            $ref: "#/components/schemas/DeliveryReceipt"
                        },
                        notes: {
                            type: "string",
                            example: "Entrega realizada correctamente."
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",
                    required: ["status", "code", "message"],
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
                    allOf: [
                        {
                            $ref: "#/components/schemas/ErrorResponse"
                        },
                        {
                            type: "object",
                            properties: {
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
                        }
                    ]
                },

                SuccessResponse: {
                    type: "object",
                    required: ["status", "message"],
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
                                "Datos devueltos por la operación, cuando corresponde.",
                            oneOf: [
                                {
                                    type: "object",
                                    additionalProperties: true
                                },
                                {
                                    type: "array",
                                    items: {}
                                },
                                {
                                    type: "string"
                                },
                                {
                                    type: "number"
                                },
                                {
                                    type: "boolean"
                                }
                            ]
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