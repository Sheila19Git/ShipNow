const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("ShipNow API", () => {
    it("GET /api/docs debería redirigir correctamente a Swagger UI", async () => {
        const response = await request(app).get("/api/docs");

        expect(response.status).to.equal(301);
        expect(response.headers.location).to.equal("/api/docs/");
    });
});