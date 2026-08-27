const mockService = require("../services/mock.service");

class MockController {

    getCouriers(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const couriers = mockService.getMockCouriers(qty);
            res.json(couriers);
        } catch (error) {
            next(error);
        }
    }

    getOrders(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const orders = mockService.getMockOrders(qty);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    getDeliveries(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const deliveries = mockService.getMockDeliveries(qty);
            res.json(deliveries);
        } catch (error) {
            next(error);
        }
    }

    getUsers(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const users = mockService.getMockUsers(qty);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async seedUsers(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const result = await mockService.seedUsers(qty);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async seedMockData(req, res, next) {
        try {
            const qty = req.query.qty || 1;
            const result = await mockService.seedMockData(qty);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MockController();