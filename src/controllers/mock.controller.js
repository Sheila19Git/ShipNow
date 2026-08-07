const mockService = require("../services/mock.service");


class MockController {

getCouriers(req, res) {

    try {

        const qty = req.query.qty || 1;

        const couriers = mockService.getMockCouriers(qty);

        res.json(couriers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


getOrders(req, res) {

    try {

        const qty = req.query.qty || 1;

        const orders = mockService.getMockOrders(qty);

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


getDeliveries(req, res) {

    try {

        const qty = req.query.qty || 1;

        const deliveries = mockService.getMockDeliveries(qty);

        res.json(deliveries);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}
    getUsers(req, res) {

        try {

            const qty = req.query.qty || 1;

            const users = mockService.getMockUsers(qty);

            res.json(users);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }


    async seedUsers(req, res) {

        try {

            const qty = req.query.qty || 1;

            const result = await mockService.seedUsers(qty);

            res.status(201).json(result);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }


    async seedMockData(req, res) {

        try {

            const qty = req.query.qty || 1;

            const result = await mockService.seedMockData(qty);

            res.status(201).json(result);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }


}


module.exports = new MockController();