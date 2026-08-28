const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../src/app");
const config = require("../src/config/env.config");
const User = require("../src/models/User");

describe("ShipNow API", () => {
    let testUser;

    before(async () => {
        await mongoose.connect(config.MONGODB_URI);
    });

    after(async () => {
        await User.deleteMany({
            email: "test.shipnow@example.com"
        });

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
            expect(user).to.be.an("object");
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
        expect(response.body).to.be.an("object");
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
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("_id");
        expect(response.body).to.have.property(
            "name",
            "Usuario Test ShipNow"
        );
        expect(response.body).to.have.property(
            "email",
            "test.shipnow@example.com"
        );

        testUser = response.body;
    });

    it("POST /api/users debería devolver 400 con datos incompletos", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "Usuario incompleto"
            });

        expect(response.status).to.equal(400);
        expect(response.body).to.be.an("object");
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
        expect(response.body).to.be.an("object");
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
});