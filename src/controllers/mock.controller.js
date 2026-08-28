const mockService = require("../services/mock.service");

class MockController {

    getCouriers(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const couriers = mockService.getMockCouriers(qty);
            res.status(200).json(couriers);
        } catch (error) {
            next(error);
        }
    }

    getOrders(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const orders = mockService.getMockOrders(qty);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    getDeliveries(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const deliveries = mockService.getMockDeliveries(qty);
            res.status(200).json(deliveries);
        } catch (error) {
            next(error);
        }
    }

    getUsers(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const users = mockService.getMockUsers(qty);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async seedUsers(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const result = await mockService.seedUsers(qty);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async seedMockData(req, res, next) {
        try {
            const qty = Number(req.query.qty || 1);

            if (!Number.isInteger(qty) || qty < 1) {
                const error = new Error("Cantidad de mocks inválida");
                error.code = "INVALID_MOCK_QUANTITY";
                throw error;
            }

            const result = await mockService.seedMockData(qty);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MockController();