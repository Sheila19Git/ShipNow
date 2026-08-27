const userRepository = require("../repositories/user.repository");

const {
    UserNotFoundError,
    InvalidUserDataError
} = require("../errors/domain.errors");

class UserService {

    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async createUser(data) {
        if (!data.name || !data.email) {
            throw new InvalidUserDataError();
        }

        return await userRepository.create(data);
    }

    async updateUser(id, data) {
        const user = await userRepository.update(id, data);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async deleteUser(id) {
        const user = await userRepository.delete(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }
}

module.exports = new UserService();