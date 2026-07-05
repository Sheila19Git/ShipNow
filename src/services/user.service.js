const userRepository = require("../repositories/user.repository");

class UserService {

    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        return await userRepository.getById(id);
    }

    async createUser(data) {

        if (!data.name || !data.email) {
            throw new Error("El nombre y el email son obligatorios");
        }

        return await userRepository.create(data);
    }

    async updateUser(id, data) {
        return await userRepository.update(id, data);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }

}

module.exports = new UserService();