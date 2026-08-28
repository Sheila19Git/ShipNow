const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");

const app = require("../src/app");
const config = require("../src/config/env.config");

const User = require("../src/models/User");
const Courier = require("../src/models/Courier");
const Order = require("../src/models/Order");
const Delivery = require("../src/models/Delivery");

describe("ShipNow API", () => {

    before(async () => {
        await mongoose.connect(config.MONGODB_URI);
    });

    after(async () => {
        await User.deleteMany({
            email: "test.shipnow@example.com"
        });

        await User.deleteMany({
            email: {
                $in: [
                    "document.test@example.com",
                    "no.file.test@example.com",
                    "invalid.document.test@example.com",
                    "receipt.test@example.com",
                    "receipt.no.file@example.com"
                ]
            }
        });

        await User.deleteMany({
            name: /test/i
        });

        await User.deleteMany({
            name: /Usuario Sin Archivo/i
        });

        await User.deleteMany({
            name: /Usuario Tipo Invalido/i
        });

        await Courier.deleteMany({});
        await Order.deleteMany({});
        await Delivery.deleteMany({});

        await mongoose.connection.close();
    });

    it("GET /api/docs debería redirigir correctamente a Swagger UI", async () => {
        const response = await request(app).get("/api/docs");

        expect(response.status).to.equal(301);
        expect(response.headers.location).to.equal("/api/docs/");
    });

    it("GET /api/logger/test debería generar los logs de prueba", async () => {
        const response = await request(app).get("/api/logger/test");

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property(
            "message",
            "Logs de prueba generados correctamente"
        );
    });

    it("GET /api/mocks/users?qty=5 debería generar 5 usuarios mock", async () => {
        const response = await request(app)
            .get("/api/mocks/users")
            .query({ qty: 5 });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.lengthOf(5);

        response.body.forEach((user) => {
            expect(user).to.have.property("name");
            expect(user).to.have.property("email");
            expect(user).to.have.property("role");
        });
    });

    it("GET /api/mocks/users?qty=0 debería devolver un error de cantidad inválida", async () => {
        const response = await request(app)
            .get("/api/mocks/users")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property(
            "message",
            "La cantidad de mocks debe ser un número entero mayor a 0"
        );
    });

    it("GET /api/ruta-inexistente debería devolver 404", async () => {
        const response = await request(app).get("/api/ruta-inexistente");

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });

    it("GET /api/users debería obtener la lista de usuarios", async () => {
        const response = await request(app).get("/api/users");

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
    });

    it("POST /api/users debería crear un usuario válido", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "Usuario Test ShipNow",
                email: "test.shipnow@example.com",
                role: "user"
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("_id");
        expect(response.body).to.have.property(
            "name",
            "Usuario Test ShipNow"
        );
        expect(response.body).to.have.property(
            "email",
            "test.shipnow@example.com"
        );
    });

    it("POST /api/users debería devolver 400 con datos incompletos", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "Usuario incompleto"
            });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_USER_DATA"
        );
        expect(response.body).to.have.property(
            "message",
            "El nombre y el email son obligatorios"
        );
    });

    it("GET /api/users/:id debería devolver 404 si el usuario no existe", async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const response = await request(app).get(
            `/api/users/${fakeId}`
        );

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "USER_NOT_FOUND"
        );
        expect(response.body).to.have.property(
            "message",
            "Usuario no encontrado"
        );
    });

    it("GET /api/orders debería obtener la lista de pedidos", async () => {
        const response = await request(app).get("/api/orders");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("payload");
        expect(response.body.payload).to.be.an("array");
    });

    it("POST /api/orders debería crear un pedido", async () => {
        const response = await request(app)
            .post("/api/orders")
            .send({
                user: new mongoose.Types.ObjectId().toString(),
                products: [
                    {
                        product: new mongoose.Types.ObjectId().toString(),
                        quantity: 1
                    }
                ],
                priority: "medium"
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property(
            "message",
            "Pedido creado correctamente"
        );
    });

    it("GET /api/orders/:id debería consultar un pedido", async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();

        const response = await request(app).get(
            `/api/orders/${fakeId}`
        );

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("payload");
        expect(response.body.payload).to.be.an("object");
    });

    it("GET /api/deliveries debería obtener la lista de entregas", async () => {
        const response = await request(app).get("/api/deliveries");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("payload");
        expect(response.body.payload).to.be.an("array");
    });

    it("POST /api/deliveries debería crear una entrega", async () => {
        const response = await request(app)
            .post("/api/deliveries")
            .send({
                order: new mongoose.Types.ObjectId().toString(),
                courier: new mongoose.Types.ObjectId().toString()
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property(
            "message",
            "Entrega creada"
        );
    });

    it("GET /api/deliveries/:id debería consultar una entrega por ID", async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();

        const response = await request(app).get(
            `/api/deliveries/${fakeId}`
        );

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("payload");
        expect(response.body.payload).to.have.property("id", fakeId);
    });

    it("GET /api/mocks/couriers?qty=3 debería generar 3 repartidores mock", async () => {
        const response = await request(app)
            .get("/api/mocks/couriers")
            .query({ qty: 3 });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.lengthOf(3);
    });

    it("GET /api/mocks/orders?qty=3 debería generar 3 pedidos mock", async () => {
        const response = await request(app)
            .get("/api/mocks/orders")
            .query({ qty: 3 });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.lengthOf(3);
    });

    it("GET /api/mocks/deliveries?qty=3 debería generar 3 entregas mock", async () => {
        const response = await request(app)
            .get("/api/mocks/deliveries")
            .query({ qty: 3 });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.lengthOf(3);
    });

    it("GET /api/mocks/couriers?qty=0 debería devolver cantidad inválida", async () => {
        const response = await request(app)
            .get("/api/mocks/couriers")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
    });

    it("GET /api/mocks/orders?qty=0 debería devolver cantidad inválida", async () => {
        const response = await request(app)
            .get("/api/mocks/orders")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
    });

    it("GET /api/mocks/deliveries?qty=0 debería devolver cantidad inválida", async () => {
        const response = await request(app)
            .get("/api/mocks/deliveries")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
    });

    it("POST /api/mocks/seed/users?qty=2 debería insertar 2 usuarios mock", async () => {
        const response = await request(app)
            .post("/api/mocks/seed/users")
            .query({ qty: 2 });

        expect(response.status).to.equal(201);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("insertados", 2);
        expect(response.body).to.have.property(
            "coleccion",
            "usuarios"
        );
    });

    it("POST /api/mocks/seed/users?qty=0 debería devolver cantidad inválida", async () => {
        const response = await request(app)
            .post("/api/mocks/seed/users")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
    });

    it("POST /api/mocks/seed?qty=2 debería insertar todos los datos mock", async () => {
        const response = await request(app)
            .post("/api/mocks/seed")
            .query({ qty: 2 });

        expect(response.status).to.equal(201);
        expect(response.body).to.be.an("object");

        expect(response.body).to.have.property("usuarios", 2);
        expect(response.body).to.have.property("repartidores", 2);
        expect(response.body).to.have.property("pedidos", 2);
        expect(response.body).to.have.property("entregas", 2);
    });

    it("POST /api/mocks/seed?qty=0 debería devolver cantidad inválida", async () => {
        const response = await request(app)
            .post("/api/mocks/seed")
            .query({ qty: 0 });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("status", "error");
        expect(response.body).to.have.property(
            "code",
            "INVALID_MOCK_QUANTITY"
        );
    });

    it("POST /api/users/:userId/documents debería cargar un documento correctamente", async () => {
        const user = await User.create({
            name: "Usuario Documento Test",
            email: "document.test@example.com",
            role: "USER"
        });

        const response = await request(app)
            .post(`/api/users/${user._id}/documents`)
            .field("documentType", "DNI")
            .attach(
                "document",
                Buffer.from("contenido de prueba"),
                {
                    filename: "documento-test.pdf",
                    contentType: "application/pdf"
                }
            );

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property(
            "message",
            "Documento cargado correctamente"
        );
        expect(response.body.user).to.have.property("documents");
        expect(response.body.user.documents).to.have.lengthOf(1);
        expect(response.body.user.documents[0]).to.have.property(
            "documentType",
            "DNI"
        );
    });

    it("POST /api/users/:userId/documents debería devolver error si falta el archivo", async () => {
        await User.deleteOne({
            email: "no.file.test@example.com"
        });

        const user = await User.create({
            name: "Usuario Sin Archivo",
            email: "no.file.test@example.com",
            role: "USER"
        });

        const response = await request(app)
            .post(`/api/users/${user._id}/documents`)
            .field("documentType", "DNI");

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
            "status",
            "error"
        );
        expect(response.body).to.have.property(
            "code",
            "FILE_REQUIRED"
        );
    });

    it("POST /api/users/:userId/documents debería devolver error con tipo de documento inválido", async () => {
        await User.deleteOne({
            email: "invalid.document.test@example.com"
        });

        const user = await User.create({
            name: "Usuario Tipo Invalido",
            email: "invalid.document.test@example.com",
            role: "USER"
        });

        const response = await request(app)
            .post(`/api/users/${user._id}/documents`)
            .field("documentType", "DOCUMENTO_INEXISTENTE")
            .attach(
                "document",
                Buffer.from("contenido de prueba"),
                {
                    filename: "documento-test.pdf",
                    contentType: "application/pdf"
                }
            );

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
            "status",
            "error"
        );
        expect(response.body).to.have.property(
            "code",
            "INVALID_DOCUMENT_TYPE"
        );
    });

    it("POST /api/users/:userId/documents debería devolver error si el usuario no existe", async () => {
        const fakeUserId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .post(`/api/users/${fakeUserId}/documents`)
            .field("documentType", "DNI")
            .attach(
                "document",
                Buffer.from("contenido de prueba"),
                {
                    filename: "documento-test.pdf",
                    contentType: "application/pdf"
                }
            );

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property(
            "status",
            "error"
        );
        expect(response.body).to.have.property(
            "code",
            "USER_NOT_FOUND"
        );
    });

    it("POST /api/deliveries/:deliveryId/receipt debería cargar un comprobante correctamente", async () => {
        const user = await User.create({
            name: "Usuario Receipt Test",
            email: "receipt.test@example.com",
            role: "USER"
        });

        const courier = await Courier.create({
            user: user._id,
            available: true
        });

        const order = await Order.create({
            user: user._id,
            products: [],
            status: "CONFIRMED",
            priority: "MEDIUM"
        });

        const delivery = await Delivery.create({
            order: order._id,
            courier: courier._id,
            status: "ASSIGNED"
        });

        const response = await request(app)
            .post(`/api/deliveries/${delivery._id}/receipt`)
            .attach(
                "receipt",
                Buffer.from("comprobante de prueba"),
                {
                    filename: "comprobante-test.pdf",
                    contentType: "application/pdf"
                }
            );

        expect(response.status).to.equal(201);

        expect(response.body).to.have.property(
            "status",
            "success"
        );

        expect(response.body).to.have.property(
            "message",
            "Comprobante cargado correctamente"
        );

        expect(response.body.delivery).to.have.property(
            "receipt"
        );

        expect(response.body.delivery.receipt).to.have.property(
            "originalName",
            "comprobante-test.pdf"
        );

        expect(response.body.delivery.receipt).to.have.property(
            "mimeType",
            "application/pdf"
        );
    });

    it("POST /api/deliveries/:deliveryId/receipt debería devolver error si falta el comprobante", async () => {
        await User.deleteOne({
            email: "receipt.no.file@example.com"
        });

        const user = await User.create({
            name: "Usuario Receipt Sin Archivo",
            email: "receipt.no.file@example.com",
            role: "USER"
        });

        const courier = await Courier.create({
            user: user._id,
            available: true
        });

        const order = await Order.create({
            user: user._id,
            products: [],
            status: "CONFIRMED",
            priority: "MEDIUM"
        });

        const delivery = await Delivery.create({
            order: order._id,
            courier: courier._id,
            status: "ASSIGNED"
        });

        const response = await request(app)
            .post(`/api/deliveries/${delivery._id}/receipt`);

        expect(response.status).to.equal(400);

        expect(response.body).to.have.property(
            "status",
            "error"
        );

        expect(response.body).to.have.property(
            "code",
            "FILE_REQUIRED"
        );
    });

    it("POST /api/deliveries/:deliveryId/receipt debería devolver error si la entrega no existe", async () => {
        const fakeDeliveryId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .post(`/api/deliveries/${fakeDeliveryId}/receipt`)
            .attach(
                "receipt",
                Buffer.from("comprobante de prueba"),
                {
                    filename: "comprobante-test.pdf",
                    contentType: "application/pdf"
                }
            );

        expect(response.status).to.equal(404);

        expect(response.body).to.have.property(
            "status",
            "error"
        );

        expect(response.body).to.have.property(
            "code",
            "DELIVERY_NOT_FOUND"
        );
    });

});