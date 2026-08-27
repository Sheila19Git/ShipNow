const userService = require("../services/user.service");

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const user = await userService.updateUser(
                req.params.id,
                req.body
            );
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();